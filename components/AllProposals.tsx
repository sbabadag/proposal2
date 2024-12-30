import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure correct import
import { useRouter } from 'expo-router';
import { ref, onValue, getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase';
import styles from '../app/styles/styles'; // Adjust the path as needed

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

interface Proposal {
  id: string;
  number: string;
  date: string;
  companyInfo: any;
  client: any;
  totals: any;
}

const AllProposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]); // New state
  const [clientFilter, setClientFilter] = useState<string>('All'); // New state for filter
  const router = useRouter();

  useEffect(() => {
    const proposalsRef = ref(db, 'proposals');
    onValue(proposalsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedProposals: Proposal[] = [];
      for (let key in data) {
        loadedProposals.push({ id: key, ...data[key] });
      }
      setProposals(loadedProposals);
      setFilteredProposals(loadedProposals); // Initialize filtered proposals
    });
  }, []);

  useEffect(() => {
    if (clientFilter === 'All') {
      setFilteredProposals(proposals);
    } else {
      setFilteredProposals(
        proposals.filter(
          (proposal) => proposal.client && proposal.client.company === clientFilter
        )
      );
    }
  }, [clientFilter, proposals]);

  const getUniqueClients = () => {
    const clientNames = proposals
      .filter((proposal) => proposal.client && proposal.client.company)
      .map((proposal) => proposal.client.company);
    return ['All', ...Array.from(new Set(clientNames))];
  };

  const renderProposal = ({ item }: { item: Proposal }) => (
    <TouchableOpacity
      style={styles.proposalCard}
      onPress={() => {
        if (item.id === 'new') {
          // Clear any necessary fields or states here if needed
          router.push('../proposal/new');
        } else {
          router.push(`../proposal/${item.id}`);
        }
      }}
    >
      <Text style={styles.proposalNumber}>Proposal No: {item.number}</Text>
      <Text style={styles.proposalDate}>Date: {item.date}</Text>
      <Text
        style={
          item.client ? styles.proposalClient : styles.proposalClientNAN
        }
      >
        Client: {item.client ? item.client.company : 'N/A'}
      </Text>
      <Text style={styles.proposalTotal}>
        Total: {item.totals.total.toLocaleString('tr-TR')} TL
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={clientFilter}
        style={styles.picker}
        onValueChange={(itemValue) => setClientFilter(itemValue)}
      >
        {getUniqueClients().map((client, index) => (
          <Picker.Item label={client} value={client} key={index} />
        ))}
      </Picker>
      <FlatList
        data={[{ id: 'new', number: '', date: '', companyInfo: {}, client: {}, totals: {} }, ...filteredProposals]}
        keyExtractor={(item) => item.id}
        renderItem={renderProposal}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default AllProposals;

