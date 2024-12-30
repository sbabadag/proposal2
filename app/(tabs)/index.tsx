import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/firebase';
import styles from '../styles/styles';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const MainScreen = () => {
  const router = useRouter();
  interface Proposal {
    id: string;
    client?: {
      company: string;
      personnel: string;
      address: string;
    };
    number: string;
    date: string;
    totalValue?: number; // Make totalValue optional
    totalAmount?: number; // Add totalAmount field
  }
  
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    const proposalsRef = ref(db, 'proposals');
    onValue(proposalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const proposalsList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProposals(proposalsList);
      }
    });
  }, []);

  const handleCardPress = (data: Proposal) => {
    router.push({
      pathname: '/ProposalScreen',
      params: { cardData: JSON.stringify(data) }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={proposals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.proposalCard}
            onPress={() => handleCardPress(item)}
          >
            <Text style={styles.proposalNumber}>Proposal No: {item.number}</Text>
            {item.client && (
              <Text style={styles.proposalClient}>Client: {item.client.company}</Text>
            )}
            {item.totalValue !== undefined && (
              <Text style={styles.proposalValue}>Total Value: ${item.totalValue.toFixed(2)}</Text>
            )}
            {item.totalAmount !== undefined && (
              <Text style={styles.proposalAmount}>Total Amount: ${item.totalAmount.toFixed(2)}</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MainScreen;
