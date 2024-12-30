import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 8,
    width: '100%', // Ensure full width
  },
  frame: {
    flex: 1,
    paddingTop: 48,
    marginBottom: 60, // Height of footer
  },
  frameInner: {
    backgroundColor: '#f4f6f8',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '100%',
    padding: 16, // Add padding for better spacing on different screens
  },
  container: {
    flex: 1, // Ensure the container occupies full space
  },
  content: {
    padding: 8,
    paddingBottom: 16,
    width: '100%', // Ensure content takes full width
  },
  headerContainer: {
    backgroundColor: '#2563eb',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 4,
  },
  headerContent: {
    padding: 8,
    paddingBottom: 2, // Changed from 5 to 2 to reduce the gap
  },
  headerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLogoColumn: {
    flex: 1,
    paddingRight: 16,
  },
  headerInfoColumn: {
    flex: 2,
    alignItems: 'flex-end',
  },
  companyName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 13,
    marginTop: 1,
    opacity: 0.9,
  },
  section: {
    marginVertical: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  mt4: {
    marginTop: 16,
  },
  tableCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  tableHeader: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row', // Added to arrange children horizontally
    justifyContent: 'space-between', // Ensures space between title and buttons
    alignItems: 'center', // Vertically centers the items
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  tableContent: {
    height: 40 * 3 + 50, // Reduced height by two row heights
    overflow: 'hidden',
  },
  tableItems: {
    flexGrow: 0, // Changed from 1 to 0
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 4,
    alignItems: 'center',
    height: 40, // ITEM_HEIGHT
  },
  tableHeaderCell: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  tableCell: {
    fontSize: 13,
    padding: 2,
    textAlign: 'center',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flexHalf: {
    flex: 0.5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  totalValue: {
    fontSize: 14,
    color: '#4b5563',
  },
  totalLabelBold: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  totalValueBold: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  finalTotal: {
    marginTop: 8,
    borderBottomWidth: 0,
  },
  mt2: {
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginTop: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  proposalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(7, 1, 17, 0.1)',
  },
  proposalInfo: {
    marginLeft: 32,
  },
  proposalLabel: {
    color: 'rgba(2, 23, 23, 0.1)',
    fontSize: 12,
    opacity: 0.8,
  },
  proposalValue: {
    color: 'rgba(0, 0, 0, 0.1)',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
  proposalInput: {
    color: 'rgba(0, 0, 0, 0.1)',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 4,
    padding: 0,
    
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  selectButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  clientCard: {
    padding: 16,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  clientDetail: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  placeholderText: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
  },
  tableContainer: {
    flex: 1,
    marginBottom: 16,
    flexGrow: 0, // Prevents the container from expanding beyond its content
    paddingVertical: 10, // Adds vertical padding for better spacing
    width: '100%', // Ensure table fits the screen width
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#374151',
  },
  modalCloseButton: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  printButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1, // Ensure the button is on top
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f4f6f8',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButtonContainer: {
    padding: 16,
    backgroundColor: '#f4f6f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
  },
  contentWrapper: {
    flex: 1,
    marginBottom: 60, // Height of footer
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f4f6f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: '#f4f6f8', // Changed from blue to light gray
  },
  fixedFooter: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  footerButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  headerBar: {
    backgroundColor: '#00000',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 48, // Add space for status bar
  },
  headerButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  headerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000, // Ensure it's above other content
  },
  actionButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
    flexDirection: 'row', // Added to align icon and text horizontally
    justifyContent: 'center', // Center the content
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8, // Added spacing between icon and text
  },
  outerContainer: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  mainContent: {
    flex: 1,
  },
  bottomActions: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  contentContainer: {
    flexGrow: 1, // Allow content to expand without overlapping
    paddingBottom: 100, // Adjust based on button height
  },
  buttonFlex: {
    flex: 1,
    marginHorizontal: 8,
    minWidth: 100, // Set a minimum width for buttons
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row', // Added to align icon and text horizontally
    justifyContent: 'center', // Center the content
    width: '100%', // Make buttons take full available width within their container
  },
  cancelButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8, // Added spacing between icon and text
  },
  addButton: {
    backgroundColor: '#2563eb',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '600',
  },
  proposalCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  proposalNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  proposalDate: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  proposalClient: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  proposalClientNAN: { // New style for 'N/A'
    fontSize: 14,
    color: '#ff0000', // Red color to indicate missing data
    marginBottom: 4,
  },
  proposalTotal: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#2563eb',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
  },
  cardDataContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  cardDataText: {
    fontSize: 16,
    color: '#333',
  },
  logoContainer: {
    width: 200,
    height: 133, // 3:2 aspect ratio
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  logoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  settingsSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,

  },
  proposalAmount: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});

export default styles;
