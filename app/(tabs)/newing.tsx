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

type TTicTacToeWinner = {
  player: string;
  positions: number[];
};

const Newing = () => {
  const positionsTicTacToeWinner: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const initialTableTicTacToe = Array.from({ length: 9 }, (_, i) => ({
    position: i,
    value: '',
  }));

  const colorScheme = useColorScheme();
  const ColorsApp = Colors[colorScheme ?? 'light'];
  const [player, setPlayer] = useState<string>('X');
  const [winner, setWinner] = useState<TTicTacToeWinner | null>(null);
  const [tableTicTacToe, setTableTicTacToe] = useState<TTicTacToeVal[]>(
    initialTableTicTacToe,
  );
  const [tiedGame, setTiedGame] = useState<boolean>(false);

  const onResetGameTicTacToe = () => {
    setTableTicTacToe(initialTableTicTacToe);
    setWinner(null);
    setTiedGame(false);
  };

  const onChangingPlayer = () => {
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const onClickValTicTacToe = (item: TTicTacToeVal) => {
    const currentTableTicTacToe = [...tableTicTacToe];

    const findItem = currentTableTicTacToe.find(
      (val) => val.position === item.position,
    );
    if (findItem && !findItem.value) {
      findItem.value = player;

      const isWinnerWithPositions = positionsTicTacToeWinner.find((items) => {
        return items.every((val) => {
          return currentTableTicTacToe[val - 1].value === player;
        });
      });

      if (isWinnerWithPositions) {
        setWinner({
          player,
          positions: isWinnerWithPositions || [],
        });
      }

      if (currentTableTicTacToe.every(({ value }) => !!value)) {
        setTiedGame(true);
      }

      setTableTicTacToe([...currentTableTicTacToe]);
      onChangingPlayer();
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
                style={{
                  ...styles.valContainerTicTacToe,
                  backgroundColor: winner?.positions.includes(
                    items.position + 1,
                  )
                    ? player === 'X'
                      ? '#dc2626'
                      : '#2563eb'
                    : tiedGame
                      ? '#fcfc5a'
                      : '#fff',
                }}
                onPress={() => !winner && onClickValTicTacToe(items)}
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
        <ThemedText type="subtitle">Acciones</ThemedText>
      </View>
      <View style={{ flex: 1, padding: 8, display: 'flex' }}>
        <View style={styles.containerRow}>
          <ThemedText type="defaultSemiBold">{'Inicia: '}</ThemedText>
          <ThemedText type="defaultSemiBold">{player}</ThemedText>
          <View style={{ paddingHorizontal: 16 }}>
            <Button
              title="Cambiar"
              onPress={onChangingPlayer}
              disabled={
                !tableTicTacToe.every(({ value }) => !value) || !!winner
              }
            />
          </View>
          <View style={{ paddingRight: 16 }}><Button title="Restablecer" onPress={() => onResetGameTicTacToe()} /></View>
        <View>
          {!!winner && (
            <ThemedText type="defaultSemiBold">
              {`Ganador: ${winner.player}`}
            </ThemedText>
          )}
          {tiedGame && (
            <ThemedText type="defaultSemiBold">{`Empate!`}</ThemedText>
          )}
        </View>
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
