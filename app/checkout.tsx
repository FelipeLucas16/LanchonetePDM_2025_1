import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Checkout() {
  const router = useRouter();
  const { customer: customerString, cart: cartString } = useLocalSearchParams();

  console.log("Customer no Checkout:", customerString); // Depuração
  console.log("Cart no Checkout:", cartString); // Depuração

  const customer = typeof customerString === "string" ? JSON.parse(customerString) : null;
  const cart = typeof cartString === "string" ? JSON.parse(cartString) : [];

  const totalValue = cart.reduce((sum: number, item: { price: number }) => sum + item.price, 0).toFixed(2);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Resumo da Compra</Text>
        <Text style={styles.subHeaderText}>Cliente: {customer?.name}</Text>
        <Text style={styles.subHeaderText}>Telefone: {customer?.phone}</Text>
      </View>

      {/* Lista de Itens do Carrinho */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
          </View>
        )}
        contentContainerStyle={styles.cartList}
      />

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalValue}>R$ {totalValue}</Text>
      </View>

      {/* Rodapé com Botões */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => alert("Pedido finalizado!")}
        >
          <Text style={styles.finishButtonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/menu")}
        >
          <Text style={styles.backButtonText}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Fundo claro
  },
  header: {
    padding: 20,
    backgroundColor: "#4CAF50", // Verde para o cabeçalho
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // Texto branco
  },
  subHeaderText: {
    fontSize: 16,
    color: "#e0f7fa", // Texto branco mais claro
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff", // Fundo branco para os itens
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra no Android
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333", // Cor escura para o nome
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50", // Verde para o preço
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff", // Fundo branco para o total
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra no Android
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Cor escura para o texto
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50", // Verde para o valor total
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff", // Fundo branco para o rodapé
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra no Android
  },
  finishButton: {
    backgroundColor: "#4CAF50", // Verde para o botão de finalizar
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  finishButtonText: {
    color: "#fff", // Texto branco
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#e0e0e0", // Cinza para o botão de voltar
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#333", // Texto escuro
    fontSize: 18,
    fontWeight: "bold",
  },
});