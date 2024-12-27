import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';

const SettingsPage = () => {
  const [email, setEmail] = useState('user@example.com');
  const [name, setName] = useState('John Doe');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false
  });
  const [theme, setTheme] = useState('light');
  const [privacy, setPrivacy] = useState({
    profile: 'public',
    activity: 'friends'
  });

  const handleSave = () => {
    console.log('Saving settings...');
    // Implementation for saving settings would go here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Display Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={styles.switchGroup}>
          <Text style={styles.label}>Email Notifications</Text>
          <Switch
            value={notifications.email}
            onValueChange={(value) => setNotifications({ ...notifications, email: value })}
          />
        </View>
        <View style={styles.switchGroup}>
          <Text style={styles.label}>Push Notifications</Text>
          <Switch
            value={notifications.push}
            onValueChange={(value) => setNotifications({ ...notifications, push: value })}
          />
        </View>
        <View style={styles.switchGroup}>
          <Text style={styles.label}>Marketing Communications</Text>
          <Switch
            value={notifications.marketing}
            onValueChange={(value) => setNotifications({ ...notifications, marketing: value })}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance Settings</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Theme</Text>
          <TextInput
            style={styles.input}
            value={theme}
            onChangeText={setTheme}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Profile Visibility</Text>
          <TextInput
            style={styles.input}
            value={privacy.profile}
            onChangeText={(value) => setPrivacy({ ...privacy, profile: value })}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Activity Status</Text>
          <TextInput
            style={styles.input}
            value={privacy.activity}
            onChangeText={(value) => setPrivacy({ ...privacy, activity: value })}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsPage;