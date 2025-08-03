import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';

const CyberCellList = ({ nearbyCells, userLocation }) => {
  if (!nearbyCells || nearbyCells.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No nearby cyber cells found.</Text>
      </View>
    );
  }

  const handleNavigate = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open maps app.');
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>
      {userLocation && item.distance !== undefined && (
        <Text style={styles.distance}>
          Distance: {item.distance.toFixed(2)} km
        </Text>
      )}
      <Text style={styles.info}>📞 {item.phone || 'N/A'}</Text>
      <Text style={styles.info}>📧 {item.email || 'N/A'}</Text>

      <TouchableOpacity
        style={styles.navigateButton}
        onPress={() => handleNavigate(item.lat, item.lng)}
      >
        <Text style={styles.navigateButtonText}>Navigate</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={nearbyCells}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      style={styles.list}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
  },
  itemContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 4,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#0070BA',
  },
  address: {
    color: '#666',
    marginTop: 2,
  },
  distance: {
    marginTop: 4,
    fontWeight: '600',
    color: '#444',
  },
  info: {
    marginTop: 4,
    color: '#555',
  },
  navigateButton: {
    marginTop: 8,
    backgroundColor: '#0070BA',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  navigateButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#999',
  },
});

export default CyberCellList;
