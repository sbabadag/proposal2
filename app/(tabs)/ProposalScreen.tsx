import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, FlatList, Button, GestureResponderEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { useClient } from '../../components/ClientContext';
import { printToFileAsync } from 'expo-print';
import { ref, push, getDatabase } from 'firebase/database'; // Added import
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/firebase'; // Adjust the path as needed
import styles from '..//styles/styles'; // Added import
import { Ionicons } from '@expo/vector-icons'; // Add icon import

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const ProposalScreen = () => {
  const router = useRouter();
  const { selectedClient, clients, setSelectedClient } = useClient();  // Destructure clients from context
  const generateProposalNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  interface Client {
      id: string;
      company: string;
      personnel: string;
      address: string;
    }
  
  interface FormattedDate {
      day: string;
      month: string;
      year: number;
    }

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  interface CompanyInfo {
    address: string;
    location: string;
    phone: string;
    taxNumber: string;
  }

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    address: '',
    location: '',
    phone: '',
    taxNumber: ''
  });

  const [proposalInfo, setProposalInfo] = useState({
    number: generateProposalNumber(),
    date: formatDate(new Date())
  });

  const [tableData, setTableData] = useState<TableRow[]>([
    {
      name: 'LV Switchgear Components',
      quantity: 5,
      unit: 'Set',
      price: 12500.00,
      total: 62500.00
    },
    {
      name: 'Control Panel Assembly',
      quantity: 3,
      unit: 'Pcs',
      price: 8750.00,
      total: 26250.00
    },
    {
      name: 'Power Distribution Unit',
      quantity: 2,
      unit: 'Unit',
      price: 15000.00,
      total: 30000.00
    },
  ]);

  interface TableRow {
    quantity: number;
    price: number;
    total: number;
    [key: string]: any;
  }

  const updateTableRow = (
    index: number,
    field: keyof TableRow,
    value: number | string
  ): void => {
    const newData = [...tableData];
    newData[index][field] = value;
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

  const [deliveryTime, setDeliveryTime] = useState('');
  const [technicalSpec, setTechnicalSpec] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string>('');  // Initialize with empty string
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedClientId === '') {
      setSelectedClient(null);
    } else {
      const client = clients.find(c => c.id === selectedClientId) || null;
      setSelectedClient(client);
    }
  }, [selectedClientId]);

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
    setModalVisible(false);
  };

  // Stricter filtering to ensure valid 'id' and 'company'
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
              .signature { margin-top: 50px; border-top: 1px solid #ddd; padding-top: 20px; }
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
              
              <div class="signature">
                <p>Authorized Signature: _________________</p>
                <p>Date: _________________</p>
              </div>
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

      console.log('Proposal saved successfully.');
      // Optionally, provide user feedback or navigate after saving
    } catch (error) {
      console.error('Error saving proposal:', error);
      // Optionally, handle the error (e.g., show a notification to the user)
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.frameInner}>
              <View style={styles.proposalInfoContainer}>
                <View style={styles.proposalInfo}>
                    <Text style={[styles.proposalLabel, { color: 'black' }]}>Proposal Number</Text>
                    <Text style={[styles.proposalValue, { color: 'black' }]}>NO: {proposalInfo.number}</Text>
                </View>
                <View style={styles.proposalInfo}>
                  <Text style={[styles.proposalLabel, { color: 'black' }]}>Issue Date</Text>
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
                <Text style={styles.sectionTitle}>Client Details</Text>
                <TouchableOpacity 
                  style={styles.selectButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.selectButtonText}>Select Client</Text>
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
                    <Text style={styles.tableHeaderText}>Item Details</Text>
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
                      <Text style={[styles.tableHeaderCell, styles.flex2]}>Description</Text>
                      <Text style={[styles.tableHeaderCell, styles.flexHalf]}>Qty</Text>
                      <Text style={[styles.tableHeaderCell, styles.flexHalf]}>Unit</Text>
                      <Text style={[styles.tableHeaderCell, styles.flex1]}>Price</Text>
                      <Text style={[styles.tableHeaderCell, styles.flex1]}>Total</Text>
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

                <View style={styles.grid}>
                  <View style={styles.card}>
                    <Text style={styles.label}>Delivery Terms</Text>
                    <TextInput
                      style={styles.input}
                      value={deliveryTime}
                      onChangeText={setDeliveryTime}
                      multiline
                    />
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.label}>Technical Specifications</Text>
                    <TextInput
                      style={styles.input}
                      value={technicalSpec}
                      onChangeText={setTechnicalSpec}
                      multiline
                    />
                  </View>
                </View>
              </View>

              <View style={styles.summaryCard}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Subtotal</Text>
                  <Text style={styles.totalValue}>
                    {calculateTotals().subtotal.toLocaleString('tr-TR')} TL
                  </Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>VAT (20%)</Text>
                  <Text style={styles.totalValue}>
                    {calculateTotals().kdv.toLocaleString('tr-TR')} TL
                  </Text>
                </View>
                <View style={[styles.totalRow, styles.finalTotal]}>
                  <Text style={styles.totalLabelBold}>Total Amount</Text>
                  <Text style={styles.totalValueBold}>
                    {calculateTotals().total.toLocaleString('tr-TR')} TL
                  </Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <View style={styles.buttonFlex}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => router.back()}
                  >
                    <Ionicons name="arrow-back" size={20} color="#ffffff" /> {/* Added icon */}
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonFlex}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSave}
                  >
                    <Ionicons name="save" size={20} color="#ffffff" /> {/* Added icon */}
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonFlex}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('../screen/settings-page')}
                  >
                    <Ionicons name="settings-sharp" size={20} color="#ffffff" /> {/* Added icon */}
                    <Text style={styles.buttonText}>Settings</Text>
                  </TouchableOpacity>
                </View>
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
