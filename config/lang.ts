export const translations = {
  en: {
    proposalNumber: 'Proposal Number',
    issueDate: 'Issue Date',
    clientDetails: 'Client Details',
    selectClient: 'Select Client',
    itemDetails: 'Item Details',
    description: 'Description',
    quantity: 'Qty',
    unit: 'Unit',
    price: 'Price',
    total: 'Total',
    deliveryTerms: 'Delivery Terms',
    technicalSpec: 'Technical Specifications',
    subtotal: 'Subtotal',
    vat: 'VAT (20%)',
    totalAmount: 'Total Amount',
    preview: 'Preview',
    save: 'Save',
    close: 'Close',
    selectLanguage: 'Select Language',
    english: 'English',
    turkish: 'Turkish',
    company: 'Company',
    contact: 'Contact',
    address: 'Address',
    selectClientPrompt: 'Select a client to continue',
    proposalSaved: 'Proposal saved successfully',
    errorSaving: 'Error saving proposal',
    pleaseSelectClient: 'Please select a client first',
    thankYou: 'Thank you for your business!',
    currency: 'TL',
    success: 'Success',
    error: 'Error',
    languageChanged: 'Language changed successfully',
    languageChangeError: 'Failed to change language',
    currentLanguage: 'Current Language',
    settings: 'Settings',
    languageSettings: 'Language Settings',
    sharingNotAvailable: 'Sharing is not available on this device',
    errorGeneratingPreview: 'Error generating preview',
    businessProposal: 'Business Proposal',
    companyNameRequired: 'Company name is required',
    invalidEmail: 'Please enter a valid email address',
    phoneRequired: 'Phone number is required',
    companyInfoUpdated: 'Company information updated successfully',
    errorSavingCompanyInfo: 'Error saving company information',
    errorPickingImage: 'Error picking image',
    logoUpdated: 'Logo updated successfully',
    errorUploadingLogo: 'Error uploading logo',
    switchToEnglish: 'Switch to English',
    switchToTurkish: 'Switch to Turkish',
    saveChanges: 'Save Changes',
    companyInformation: 'Company Information',
    companyLogo: 'Company Logo',
    uploadLogo: 'Upload Logo',
    upload: 'Upload',
    changeLogo: 'Change Logo',
    logoSize: 'Logo size should be 3:2 ratio',
    uploadError: 'Error uploading logo',
    uploadSuccess: 'Logo uploaded successfully',
    logo: 'Logo',
    logoUpload: 'Logo Upload',
    logoUploadError: 'Error uploading logo',
    logoUploadSuccess: 'Logo uploaded successfully',
    companyName: 'Company Name',
    email: 'Email',
    phone: 'Phone',
    update: 'Update',
    client: 'Client',
    clientName: 'Client Name',
    personnel: 'Personnel',
    clientAddress: 'Client Address',
    clientEmail: 'Client Email',
    clientPhone: 'Client Phone',
    clientInfo: 'Client Information',
    clientInfoUpdated: 'Client information updated successfully',
    errorSavingClientInfo: 'Error saving client information',
    clientLogo: 'Client Logo',
    clientLogoUpload: 'Client Logo Upload',
    clientLogoUploadError: 'Error uploading client logo',
    clientLogoUploadSuccess: 'Client logo uploaded successfully',
    clientInformation: 'Client Information',
    clientCompany: 'Client Company',
    clientEmailRequired: 'Client email is required',
    clientPhoneRequired: 'Client phone is required',
    clientNameRequired: 'Client name is required',
    clientLogoSize: 'Client logo size should be 3:2 ratio',
    taxNumber: "Tax Number",
    bankAccount: "Bank Account"
  },
  tr: {
    proposalNumber: 'Teklif',
    issueDate: 'Tarih',
    clientDetails: 'Müşteri Bilgileri',
    selectClient: 'Müşteri Seç',
    itemDetails: 'Ürün Detayları',
    description: 'Açıklama',
    quantity: 'Adet',
    unit: 'Birim',
    price: 'Fiyat',
    total: 'Toplam',
    deliveryTerms: 'Teslimat Şartları',
    technicalSpec: 'Teknik Özellikler',
    subtotal: 'Ara Toplam',
    vat: 'KDV (20%)',
    totalAmount: 'Genel Toplam',
    preview: 'PDF',
    save: 'Kaydet',
    close: 'Kapat',
    selectLanguage: 'Dil Seçimi',
    english: 'İngilizce',
    turkish: 'Türkçe',
    company: 'Firma',
    contact: 'İletişim',
    address: 'Adres',
    selectClientPrompt: 'Devam etmek için müşteri seçiniz',
    proposalSaved: 'Teklif başarıyla kaydedildi',
    errorSaving: 'Teklif kaydedilirken hata oluştu',
    pleaseSelectClient: 'Lütfen önce müşteri seçiniz',
    thankYou: 'İş birliğiniz için teşekkür ederiz!',
    currency: 'TL',
    success: 'Başarılı',
    error: 'Hata',
    languageChanged: 'Dil başarıyla değiştirildi',
    languageChangeError: 'Dil değiştirme başarısız oldu',
    currentLanguage: 'Mevcut Dil',
    settings: 'Ayarlar',
    languageSettings: 'Dil Ayarları',
    sharingNotAvailable: 'Bu cihazda paylaşım kullanılamıyor',
    errorGeneratingPreview: 'Önizleme oluşturulurken hata oluştu',
    businessProposal: 'İş Teklifi',
    companyNameRequired: 'Şirket adı gereklidir',
    invalidEmail: 'Geçerli bir e-posta adresi giriniz',
    phoneRequired: 'Telefon numarası gereklidir',
    companyInfoUpdated: 'Şirket bilgileri başarıyla güncellendi',
    errorSavingCompanyInfo: 'Şirket bilgileri kaydedilirken hata oluştu',
    errorPickingImage: 'Resim seçilirken hata oluştu',
    logoUpdated: 'Logo başarıyla güncellendi',
    errorUploadingLogo: 'Logo yüklenirken hata oluştu',
    switchToEnglish: 'İngilizce\'ye Geç',
    switchToTurkish: 'Türkçe\'ye Geç',
    saveChanges: 'Değişiklikleri Kaydet',
    companyInformation: 'Firma Bilgileri',
    companyLogo: 'Firma Logosu',
    uploadLogo: 'Logo Yükle',
    upload: 'Yükle',
    changeLogo: 'Logoyu Değiştir',
    logoSize: 'Logo boyutu 3:2 oranında olmalıdır',
    companyEmail: "Company Email",
  }
};

export type Language = 'en' | 'tr';
export type TranslationKey = keyof typeof translations.en;