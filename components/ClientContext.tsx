import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Text } from 'react-native';
import { db, storage } from '../config/firebase';
import { ref as dbRef, set, push, onValue, off } from 'firebase/database';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Client {
  id: string;
  company: string;
  personnel: string;
  address: string;
  logo?: string;
  saveClient: (client: Client) => Promise<void>;
}

interface ClientContextType {
  selectedClient: Client | null;
  setSelectedClient: (client: Client | null) => void;
  clients: Client[];
  setClients: (clients: Client[]) => void;
  saveClient: (client: Client) => Promise<void>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const clientsRef = dbRef(db, 'clients');
      
      const unsubscribe = onValue(clientsRef, 
        (snapshot) => {
          try {
            const data = snapshot.val();
            if (data) {
              const clientsList = Object.entries(data).map(([id, value]) => ({
                id,
                ...(value as Omit<Client, 'id'>)
              }));
              setClients(clientsList);
            } else {
              setClients([]);
            }
          } catch (err) {
            console.error('Error processing clients data:', err);
            setError('Error loading clients data');
          }
        },
        (err) => {
          console.error('Database error:', err);
          setError('Error connecting to database');
        }
      );

      return () => {
        unsubscribe();
        off(clientsRef);
      };
    } catch (err) {
      console.error('Setup error:', err);
      setError('Error setting up database connection');
    }
  }, []);

  const saveClient = async (client: Client) => {
    try {
      if (!db) throw new Error('Database not initialized');

      let logoUrl = client.logo;
      
      if (client.logo?.startsWith('file://')) {
        try {
          // Convert image to blob with explicit type
          const response = await fetch(client.logo);
          const blob = await response.blob();
          
          // Create a unique filename
          const filename = `logo_${Date.now()}.jpg`;
          const storageRef = ref(storage, `logos/${filename}`);

          // Upload with metadata
          await uploadBytes(storageRef, blob, {
            contentType: 'image/jpeg',
          });

          // Get download URL
          logoUrl = await getDownloadURL(storageRef);
        } catch (storageError) {
          console.error('Storage error:', storageError);
          // Continue without logo if storage fails
          logoUrl = undefined;
        }
      }

      // Save to database even if image upload fails
      const clientsRef = dbRef(db, 'clients');
      const newClientRef = push(clientsRef);
      await set(newClientRef, {
        ...client,
        logo: logoUrl,
        createdAt: new Date().toISOString()
      });

    } catch (error) {
      console.error("Error saving client:", error);
      throw error;
    }
  };

  if (error) {
    return <Text style={{ padding: 20, color: 'red' }}>{error}</Text>;
  }

  return (
    <ClientContext.Provider value={{ selectedClient, setSelectedClient, saveClient, clients, setClients }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
}
