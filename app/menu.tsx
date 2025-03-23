import { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const menuItems = [
  { id: "1", name: "Hambúrguer", image: "https://th.bing.com/th?id=OIP.R-5UJN4cEaqwvDU4Tk8LfwHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", description: "Delicioso hambúrguer artesanal.", price: 25.99 },
  { id: "2", name: "Pizza", image: "https://th.bing.com/th?id=OIP.8UeIFPMYwIErE1ShRYB9QAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", description: "Pizza de queijo com borda recheada.", price: 39.99 },
  { id: "3", name: "Refrigerante", image: "https://th.bing.com/th/id/OIP.r5YDp81DKs5tkvBpo1JwaAHaLb?w=115&h=180&c=7&r=0&o=5&pid=1.7", description: "Coca-cola 350ml.", price: 5.99 },
  { id: "4", name: "Batata Frita", image: "https://th.bing.com/th?id=OIP.BXJKMVFSNKKCGMOC89m16gHaEG&w=335&h=186&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", description: "Batata frita crocante com queijo e bacon.", price: 15.99 },
  { id: "5", name: "Hot Dog", image: "https://th.bing.com/th?id=OIP.QR5DQo7jCcZeDW616wJ05AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", description: "Cachorro-quente com molho especial.", price: 12.99 },
  { id: "6", name: "Casquinha de Sorvete", image: "https://th.bing.com/th?id=OIP.9pUvnbeIAaZ-kJDCExwMZwHaHQ&w=252&h=247&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", description: "Casquinha de sorvete", price: 8.99 },
  { id: "7", name: "Salada", image: "https://th.bing.com/th?id=OIP.4OD2S4lNmGGZF1xHH6mEoQHaFN&w=298&h=209&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", description: "Salada fresca com molho Caesar.", price: 18.99 },
  { id: "8", name: "Suco Natural", image: "https://th.bing.com/th?id=OIP.jnabP3zla7JZWOhiCmMwJgHaIE&w=239&h=261&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", description: "Suco de laranja natural.", price: 7.99 },
  { id: "9", name: "Sanduíche", image: "https://th.bing.com/th?id=OIP.mtKkGbjSKgKvgJuHVrQ00gHaEV&w=326&h=191&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", description: "Sanduíche de frango grelhado.", price: 14.99 },
  { id: "10", name: "Milkshake", image: "https://th.bing.com/th?id=OIP.p252lHMxAQthuY2NCIEzBgHaJf&w=220&h=283&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", description: "Milkshake de chocolate cremoso.", price: 10.99 },
];

export default function Menu() {
  const { customer: customerString } = useLocalSearchParams();
  const customer = typeof customerString === "string" ? JSON.parse(customerString) : null;
  const [cart, setCart] = useState<typeof menuItems>([]);

  console.log("Customer no Menu:", customer); // Depuração

  const addToCart = (item: (typeof menuItems)[number]) => {
    setCart([...cart, item]);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Olá, {customer?.name}!</Text>
        <Text style={styles.subHeaderText}>Confira nosso cardápio:</Text>
      </View>

      {/* Lista de Itens do Menu */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Rodapé com Botão de Checkout */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push({ pathname: "/checkout", params: { customer: JSON.stringify(customer), cart: JSON.stringify(cart) } })}
        >
          <Text style={styles.checkoutButtonText}>Ir para o Resumo ({cart.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.backButtonText}>Voltar à tela inicial</Text>
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
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff", // Fundo branco para os itens
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra no Android
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10, // Bordas arredondadas para a imagem
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Cor escura para o nome
  },
  itemDescription: {
    fontSize: 14,
    color: "#666", // Cor mais suave para a descrição
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50", // Verde para o preço
  },
  addButton: {
    backgroundColor: "#4CAF50", // Verde para o botão
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff", // Texto branco
    fontWeight: "bold",
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
  checkoutButton: {
    backgroundColor: "#4CAF50", // Verde para o botão de checkout
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  checkoutButtonText: {
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