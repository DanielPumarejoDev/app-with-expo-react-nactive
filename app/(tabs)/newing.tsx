import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

type TTicTacToeVal = {
  position: number;
  value: string;
};

const Newing = () => {
  const colorScheme = useColorScheme();
  const ColorsApp = Colors[colorScheme ?? 'light'];
  const [player, setPlayer] = useState<string>('X');

  const [tableTicTacToe, setTableTicTacToe] = useState<TTicTacToeVal[]>(
    Array.from({ length: 9 }, (_, i) => ({ position: i, value: '' })),
  );

  const onChangingPlayer = () => {
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const onClickValTicTacToe = (item: TTicTacToeVal) => {
    onChangingPlayer();
    const findItem = tableTicTacToe.find(
      (val) => val.position === item.position,
    );
    if (findItem) {
      findItem.value = player;
      setTableTicTacToe([...tableTicTacToe]);
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: ColorsApp.background,
      }}
    >
      <View style={styles.containNav}>
        <ThemedText type="subtitle">Tres en raya</ThemedText>
      </View>
      <View style={styles.containerChild}>
        <View style={styles.containTicTacToe}>
          {tableTicTacToe.map((items) => {
            return (
              <TouchableOpacity
                key={items.position}
                style={styles.valContainerTicTacToe}
                onPress={() => onClickValTicTacToe(items)}
              >
                <View>
                  <Text> {items.value}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.containNav}>
        <ThemedText type="subtitle">Newing</ThemedText>
      </View>
      <View style={{ flex: 1, padding: 8, display: 'flex' }}>
        <View style={styles.containerRow}>
          <ThemedText type="defaultSemiBold">{'Inicia: '}</ThemedText>
          <ThemedText type="defaultSemiBold">{player}</ThemedText>
          <View style={{ paddingHorizontal: 16 }}>
            <Button
              title="Cambiar"
              onPress={onChangingPlayer}
              disabled={!tableTicTacToe.every(({ value }) => !value)}
            />
          </View>
        </View>
        <View style={styles.containerRow}>
          <ThemedText type="defaultSemiBold">{'Init Figure: '}</ThemedText>
          <ThemedText type="defaultSemiBold">{player}</ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 8,
  },
  containerChild: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containNav: {
    width: '100%',
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 16,
    paddingVertical: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containTicTacToe: {
    height: 240,
    width: 240,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  valContainerTicTacToe: {
    width: 80,
    height: 80,
    backgroundColor: '#f2f2f2',
    display: 'flex',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    cursor: 'pointer',
  },
});

export default Newing;
