import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView, TextInput, ActivityIndicator, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set, get } from 'firebase/database';
import styles from '../styles/styles';
import { useLanguage } from '../../config/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
// import other necessary modules
// import { useRouter, useLocalSearchParams, useClient } from 'your-router-and-client-hooks'; // Adjust the import paths as needed

interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxNumber: string;
  bankAccount: string;
}

const SettingsScreen = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    address: '',
    phone: '',
    email: '',
    taxNumber: '',
    bankAccount: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const router = useRouter();
  // const params = useLocalSearchParams();
  // const { clients, selectedClient, setSelectedClient } = useClient();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([loadCompanyLogo(), loadCompanyInfo()]);
    } catch (error) {
      console.error('Error loading initial data:', error);
      Alert.alert(t('error'), language === 'tr' ? 'Veri yükleme hatası' : 'Error loading data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCompanyInfo = async () => {
    try {
      const db = getDatabase();
      const infoRef = dbRef(db, 'settings/companyInfo');
      const snapshot = await get(infoRef);
      if (snapshot.exists()) {
        setCompanyInfo(snapshot.val());
      }
    } catch (error) {
      throw error;
    }
  };

  const loadCompanyLogo = async () => {
    try {
      const db = getDatabase();
      const logoRef = dbRef(db, 'settings/companyLogo');
      const snapshot = await get(logoRef);
      if (snapshot.exists()) {
        setLogoUri(snapshot.val());
      }
    } catch (error) {
      throw error;
    }
  };

  const validateCompanyInfo = (): boolean => {
    if (!companyInfo.name.trim()) {
      Alert.alert(t('error'), t('companyNameRequired'));
      return false;
    }
    if (!companyInfo.email.trim() || !companyInfo.email.includes('@')) {
      Alert.alert(t('error'), t('invalidEmail'));
      return false;
    }
    if (!companyInfo.phone.trim()) {
      Alert.alert(t('error'), t('phoneRequired'));
      return false;
    }
    return true;
  };

  const saveCompanyInfo = async () => {
    if (!validateCompanyInfo()) return;
    
    setIsSaving(true);
    try {
      const db = getDatabase();
      await set(dbRef(db, 'settings/companyInfo'), companyInfo);
      Alert.alert(t('success'), t('companyInfoUpdated'));
    } catch (error) {
      console.error('Error saving company info:', error);
      Alert.alert(t('error'), t('errorSavingCompanyInfo'));
    } finally {
      setIsSaving(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        await uploadLogo(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert(t('error'), t('errorPickingImage'));
    }
  };

  const uploadLogo = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const storage = getStorage();
      const logoRef = storageRef(storage, 'company/logo.png');
      
      await uploadBytes(logoRef, blob);
      const downloadUrl = await getDownloadURL(logoRef);
      
      const db = getDatabase();
      await set(dbRef(db, 'settings/companyLogo'), downloadUrl);
      
      setLogoUri(downloadUrl);
      Alert.alert(t('success'), t('logoUpdated'));
    } catch (error) {
      console.error('Error uploading logo:', error);
      Alert.alert(t('error'), t('errorUploadingLogo'));
    }
  };

  const renderClientInfo = () => {
    // if (selectedClient) {
    //   return (
    //     <View>
    //       <Text>{selectedClient.company}</Text>
    //       <Text>{selectedClient.personnel}</Text>
    //       <Text>{selectedClient.address}</Text>
    //     </View>
    //   );
    // }
    // return <Text style={styles.placeholderText}>Select a client to continue</Text>;

    // ...existing code...
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>{t('companyLogo')}</Text>
        <TouchableOpacity onPress={pickImage} style={styles.logoContainer}>
          {logoUri ? (
            <Image source={{ uri: logoUri }} style={styles.logoImage} />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Ionicons name="cloud-upload-outline" size={32} color="#666" />
              <Text style={{ marginTop: 8, color: '#666' }}>{t('selectClient')}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>{t('companyInformation')}</Text>
        
        {Object.entries({
          name: 'companyName',
          address: 'address',
          phone: 'phone',
          email: 'email',
          taxNumber: 'taxNumber',
          bankAccount: 'bankAccount'
        } as const).map(([key, labelKey]) => (
        <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{t(labelKey)}</Text>
            <TextInput
                style={styles.input}
                value={companyInfo[key as keyof CompanyInfo]}
                onChangeText={(text) => setCompanyInfo({ ...companyInfo, [key]: text })}
                placeholder={t(labelKey)}
                keyboardType={key === 'email' ? 'email-address' : key === 'phone' ? 'phone-pad' : 'default'}
                multiline={key === 'address'}
            />
        </View>
        ))}

        <TouchableOpacity 
          style={[styles.button, isSaving && styles.buttonDisabled]}
          onPress={saveCompanyInfo}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <Ionicons name="save-outline" size={20} color="#ffffff" />
              <Text style={styles.buttonText}>{t('saveChanges')}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>{t('languageSettings')}</Text>
        <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
          <Ionicons name="language-outline" size={20} color="#ffffff" />
          <Text style={styles.buttonText}>
            {language === 'tr' ? t('switchToEnglish') : t('switchToTurkish')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ...existing code... */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Select a Client</Text>
            {/* Add client selection UI here */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SettingsScreen;
