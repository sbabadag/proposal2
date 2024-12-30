import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, FlatList, Button, GestureResponderEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { useClient } from '../../components/ClientContext';
import { printToFileAsync } from 'expo-print';
import { ref, push, getDatabase, onValue } from 'firebase/database'; // Added import
import * as WebBrowser from 'expo-web-browser';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/firebase'; // Adjust the path as needed
import styles from '..//styles/styles'; // Added import
import { Ionicons } from '@expo/vector-icons'; // Add icon import
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useLocalSearchParams } from 'expo-router';
import { useLanguage } from '../../config/LanguageContext';
import { generatePDF } from '../utils/pdfGenerator'; // Import your PDF generation function

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

interface Proposal {
  id: string;
  number: string;
  date: string;
  client: Client;
  tableData?: TableRow[];
  deliveryTime?: string;
  technicalSpec?: string;
}

interface TableRow {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

interface Client {
  id: string;
  company: string;
  personnel: string;
  address: string;
}

interface CompanyInfo {
  address: string;
  location: string;
  phone: string;
  taxNumber: string;
}

const ProposalScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { clients, selectedClient, setSelectedClient } = useClient();
  const { t, language } = useLanguage();
  
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [proposalInfo, setProposalInfo] = useState({ number: '', date: '' });
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    address: '',
    location: '',
    phone: '',
    taxNumber: ''
  });
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [technicalSpec, setTechnicalSpec] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [logoUri, setLogoUri] = useState<string | null>(null);

  // Initialize data when component mounts
  useEffect(() => {
    if (params.cardData) {
      try {
        const parsedData = JSON.parse(params.cardData as string);
        setProposal(parsedData);
        setProposalInfo({
          number: parsedData.number || generateProposalNumber(),
          date: parsedData.date || formatDate(new Date())
        });
        if (parsedData.client) {
          setSelectedClient(parsedData.client);
        }
        if (parsedData.tableData) {
          setTableData(parsedData.tableData);
        }
        setDeliveryTime(parsedData.deliveryTime || '');
        setTechnicalSpec(parsedData.technicalSpec || '');
      } catch (error) {
        console.error('Error parsing proposal data:', error);
      }
    } else {
      // Initialize new proposal
      setProposalInfo({
        number: generateProposalNumber(),
        date: formatDate(new Date())
      });
      setTableData([{
        name: '',
        quantity: 0,
        unit: '',
        price: 0,
        total: 0
      }]);
    }
  }, [params.cardData]);

  useEffect(() => {
    loadCompanyLogo();
  }, []);

  const loadCompanyLogo = async () => {
    try {
      const logoRef = ref(db, 'settings/companyLogo');
      onValue(logoRef, (snapshot) => {
        if (snapshot.exists()) {
          setLogoUri(snapshot.val());
        }
      });
    } catch (error) {
      console.error('Error loading company logo:', error);
    }
  };

  // Helper functions
  const generateProposalNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleClientSelect = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
    }
    setModalVisible(false);
  };

  const updateTableRow = (
    index: number,
    field: keyof TableRow,
    value: number | string
  ): void => {
    const newData = [...tableData];
    if (field === 'name' || field === 'unit') {
      newData[index][field] = value as string;
    } else if (field === 'quantity' || field === 'price' || field === 'total') {
      newData[index][field] = value as number;
    }
    if (field === 'quantity' || field === 'price') {
      newData[index].total = newData[index].quantity * newData[index].price;
    }
    setTableData(newData);
  };

  const calculateTotals = () => {
    const subtotal = tableData.reduce((sum, row) => sum + row.total, 0);
    const kdv = subtotal * 0.2;
    const total = subtotal + kdv;
    return { subtotal, kdv, total };
  };

  const renderClientInfo = () => {
    if (selectedClient) {
      return (
        <>
          <Text style={styles.clientName}>{selectedClient.company}</Text>
          <Text style={styles.clientDetail}>{selectedClient.personnel}</Text>
          <Text style={styles.clientDetail}>{selectedClient.address}</Text>
        </>
      );
    }
    return <Text style={styles.placeholderText}>Select a client to continue</Text>;
  };

  const [selectedClientId, setSelectedClientId] = useState<string>('');  // Initialize with empty string

  useEffect(() => {
    if (selectedClientId === '') {
      setSelectedClient(null);
    } else {
      const client = clients.find(c => c.id === selectedClientId) || null;
      setSelectedClient(client);
    }
  }, [selectedClientId]);

  const validClients = clients.filter(
    client => typeof client.id === 'string' && client.id.trim() !== '' &&
              typeof client.company === 'string' && client.company.trim() !== ''
  );

  const handlePrint = async (event: GestureResponderEvent) => {
    try {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { max-width: 150px; margin-bottom: 20px; }
              .title { color: #2c3e50; font-size: 24px; }
              .content { line-height: 1.6; }
              .footer { margin-top: 50px; text-align: center; color: #7f8c8d; }
              .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .table th, .table td { border: 1px solid #ddd; padding: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 class="title">Business Proposal</h1>
              <p>Date: ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="content">
              <h2>Project Overview</h2>
              <p>Details about the project scope and objectives...</p>
              
              <h2>Pricing Details</h2>
              <table class="table">
                <tr>
                  <th>Service</th>
                  <th>Price</th>
                </tr>
                <tr>
                  <td>Service 1</td>
                  <td>$1,000</td>
                </tr>
                <tr>
                  <td>Service 2</td>
                  <td>$2,000</td>
                </tr>
              </table>
            </div>
            <div class="footer">
              <p>Thank you for your business!</p>
            </div>
          </body>
        </html>
      `;

      const { uri } = await printToFileAsync({ html });
      console.log('PDF saved to:', uri);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedClient) {
      alert('Please select a client first');
      return;
    }

    try {
      const proposalData = {
        number: proposalInfo.number,
        date: proposalInfo.date,
        companyInfo,
        client: selectedClient,
        tableData,
        deliveryTime,
        technicalSpec,
        totals: calculateTotals(),
        createdAt: new Date().toISOString(),
      };

      const proposalsRef = ref(db, 'proposals');
      await push(proposalsRef, proposalData);
      alert('Proposal saved successfully');
      router.back();
    } catch (error) {
      console.error('Error saving proposal:', error);
      alert('Error saving proposal');
    }
  };

  const ITEM_HEIGHT = 40; // Height of each item row
  const VISIBLE_ITEMS = 5; // Number of visible items

  const addNewItem = () => {
    const newItem: TableRow = {
      name: '',
      quantity: 0,
      unit: '',
      price: 0,
      total: 0,
    };
    setTableData([...tableData, newItem]);
  };

  const deleteLastItem = () => {
    if (tableData.length === 0) return;
    const newData = [...tableData];
    newData.pop();
    setTableData(newData);
  };

  const generatePDF = async () => {
    if (!selectedClient) {
      alert(t('pleaseSelectClient'));
      return;
    }

    try {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              @page {
                size: A4;
                margin: 10mm;
              }
              body {
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                line-height: 1.5;
                color: #333;
                margin: 0;
                display: flex;
                flex-direction: column;
                height: 100%;
              }
              .container {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 8mm;
              }
              .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px; /* Reduced from 20px */
              }
              .logo {
                max-width: 120px; /* Reduced from 150px */
              }
              .title {
                font-size: 24px;
                color: #2c3e50;
              }
              .section-title {
                font-size: 16px; /* Reduced from 18px */
                color: #34495e;
                border-bottom: 2px solid #3498db;
                display: inline-block;
                padding-bottom: 5px;
                margin-bottom: 5px; /* Reduced from 10px */
              }
              .table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
              }
              .table th, .table td {
                border: 1px solid #ddd;
                padding: 6px;
                text-align: left;
              }
              .table th {
                background-color: #3498db;
                color: white;
              }
              .content {
                flex: 1;
              }
              .totals {
                margin-top: 20px;
                float: right;
                width: 300px;
              }
              .totals div {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
              }
              .totals .total-label {
                font-weight: bold;
              }
              .terms {
                clear: both;
                margin-top: 30px;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                font-size: 12px;
                color: #95a5a6;
              }
              .client-info {
                margin-bottom: 10px; /* Added to reduce space after client info */
              }
              .client-info p {
                margin: 1px 0; /* Reduced from 2px */
              }
              .bottom-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                margin-top: auto;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${logoUri}" class="logo" alt="Company Logo">
                <div>
                  <h1 class="title">${t('proposalNumber')}</h1>
                  <p>${t('proposalNumber')}: ${proposalInfo.number}</p>
                  <p>${t('issueDate')}: ${proposalInfo.date}</p>
                </div>
              </div>

              <div class="client-info">
                <h2 class="section-title">${t('clientDetails')}</h2>
                <p><strong>${t('company')}:</strong> ${selectedClient.company}</p>
                <p><strong>${t('contact')}:</strong> ${selectedClient.personnel}</p>
                <p><strong>${t('address')}:</strong> ${selectedClient.address}</p>
              </div>
              
              <div class="content">
                <h2 class="section-title">${t('itemDetails')}</h2>
                <table class="table">
                  <thead>
                    <tr>
                      <th>${t('description')}</th>
                      <th>${t('quantity')}</th>
                      <th>${t('unit')}</th>
                      <th>${t('price')} (${t('currency')})</th>
                      <th>${t('total')} (${t('currency')})</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tableData.map(item => `
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.unit}</td>
                        <td>${item.price.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')}</td>
                        <td>${item.total.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <div class="bottom-row">
                <div class="terms">
                  <h2 class="section-title">${t('deliveryTerms')}</h2>
                  <p><strong>${t('deliveryTerms')}:</strong> ${deliveryTime}</p>
                  <p><strong>${t('technicalSpec')}:</strong> ${technicalSpec}</p>
                </div>

                <div class="totals">
                  <div>
                    <span class="total-label">${t('subtotal')}:</span>
                    <span>${calculateTotals().subtotal.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ${t('currency')}</span>
                  </div>
                  <div>
                    <span class="total-label">${t('vat')}:</span>
                    <span>${calculateTotals().kdv.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ${t('currency')}</span>
                  </div>
                  <div>
                    <span class="total-label"><strong>${t('totalAmount')}:</strong></span>
                    <span><strong>${calculateTotals().total.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ${t('currency')}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      const { uri } = await printToFileAsync({
        html,
        base64: false
      });

      console.log('PDF saved to:', uri);
      return uri;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  };

  const generatePreview = async () => {
    if (!selectedClient) {
      alert(t('pleaseSelectClient'));
      return;
    }

    try {
      const uri = await generatePDF();
      if (!uri) {
        alert(t('errorGeneratingPreview'));
        return;
      }
      const canShare = await Sharing.isAvailableAsync();
      
      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: t('preview')
        });
      } else {
        alert(t('sharingNotAvailable'));
      }

      setPdfUri(uri);
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      alert(t('errorGeneratingPreview'));
    }
  };

  const handleSaveWithPreview = async () => {
    if (!pdfUri) {
      alert('Please preview the document first');
      return;
    }
    
    await handleSave();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.proposalInfoContainer}>
          <View style={styles.proposalInfo}>
            <Text style={[styles.proposalLabel, { color: 'black' }]}>{t('proposalNumber')}</Text>
            <Text style={[styles.proposalValue, { color: 'black' }]}>NO: {proposalInfo.number}</Text>
          </View>
          <View style={styles.proposalInfo}>
            <Text style={[styles.proposalLabel, { color: 'black' }]}>{t('issueDate')}</Text>
            <TextInput
              style={[styles.proposalInput, { color: 'black' }]}
              value={proposalInfo.date}
              onChangeText={(text) => setProposalInfo({...proposalInfo, date: text})}
            />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('clientDetails')}</Text>
              <TouchableOpacity 
                style={styles.selectButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.selectButtonText}>{t('selectClient')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.grid}>
              <View style={[styles.card, styles.clientCard]}>
                {renderClientInfo()}
              </View>
            </View>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.tableContainer}>
              <View style={styles.tableCard}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>{t('itemDetails')}</Text>
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.addButton} onPress={addNewItem}>
                      <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={deleteLastItem}>
                      <Text style={styles.deleteButtonText}>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.tableContent}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableHeaderCell, styles.flex2]}>{t('description')}</Text>
                    <Text style={[styles.tableHeaderCell, styles.flexHalf]}>{t('quantity')}</Text>
                    <Text style={[styles.tableHeaderCell, styles.flexHalf]}>{t('unit')}</Text>
                    <Text style={[styles.tableHeaderCell, styles.flex1]}>{t('price')}</Text>
                    <Text style={[styles.tableHeaderCell, styles.flex1]}>{t('total')}</Text>
                  </View>
                  <ScrollView style={styles.tableItems}>
                    {tableData.map((item, index) => (
                      <View key={index} style={styles.tableRow}>
                        <TextInput
                          style={[styles.tableCell, styles.flex2]}
                          value={item.name}
                          onChangeText={(text) => updateTableRow(index, 'name', text)}
                        />
                        <TextInput
                          style={[styles.tableCell, styles.flexHalf]}
                          value={String(item.quantity)}
                          keyboardType="numeric"
                          onChangeText={(text) => updateTableRow(index, 'quantity', Number(text))}
                        />
                        <Text style={[styles.tableCell, styles.flexHalf]}>{item.unit}</Text>
                        <TextInput
                          style={[styles.tableCell, styles.flex1]}
                          value={String(item.price)}
                          keyboardType="numeric"
                          onChangeText={(text) => updateTableRow(index, 'price', Number(text))}
                        />
                        <Text style={[styles.tableCell, styles.flex1]}>
                          {item.total.toLocaleString('tr-TR')} TL
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>

              {/* Move the grid container here, right after the table */}
              <View style={[styles.grid, { marginTop: 16 }]}>
                <View style={styles.card}>
                  <Text style={styles.label}>{t('deliveryTerms')}</Text>
                  <TextInput
                    style={styles.input}
                    value={deliveryTime}
                    onChangeText={setDeliveryTime}
                    multiline
                  />
                </View>
                <View style={styles.card}>
                  <Text style={styles.label}>{t('technicalSpec')}</Text>
                  <TextInput
                    style={styles.input}
                    value={technicalSpec}
                    onChangeText={setTechnicalSpec}
                    multiline
                  />
                </View>
              </View>

              {/* Move summary card to the bottom */}
              <View style={[styles.summaryCard, { marginTop: 16 }]}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>{t('subtotal')}</Text>
                  <Text style={styles.totalValue}>
                    {calculateTotals().subtotal.toLocaleString('tr-TR')} TL
                  </Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>{t('vat')}</Text>
                  <Text style={styles.totalValue}>
                    {calculateTotals().kdv.toLocaleString('tr-TR')} TL
                  </Text>
                </View>
                <View style={[styles.totalRow, styles.finalTotal]}>
                  <Text style={styles.totalLabelBold}>{t('totalAmount')}</Text>
                  <Text style={styles.totalValueBold}>
                    {calculateTotals().total.toLocaleString('tr-TR')} TL
                  </Text>
                </View>
              </View>
            </View>

            {/* Move summary card to bottom */}
            <View style={styles.buttonContainer}>
              <View style={styles.buttonFlex}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={generatePreview}
                >
                  <Ionicons name="eye" size={20} color="#ffffff" />
                  <Text style={styles.buttonText}>{t('preview')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonFlex}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSaveWithPreview}
                >
                  <Ionicons name="save" size={20} color="#ffffff" />
                  <Text style={styles.buttonText}>{t('save')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonFlex}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => router.back()}
                >
                  <Ionicons name="close" size={20} color="#ffffff" />
                  <Text style={styles.buttonText}>{t('close')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={validClients}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleClientSelect(item.id)}
                >
                  <Text style={styles.modalItemText}>{item.company}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProposalScreen;
