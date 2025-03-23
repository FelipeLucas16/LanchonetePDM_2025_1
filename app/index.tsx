import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Para ícones

export default function Index() {
  const [customer, setCustomer] = useState({ name: "", phone: "" });

  // Valida se os campos nome e telefone estão preenchidos
  const isFormValid = customer.name.trim() !== "" && customer.phone.trim() !== "";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Lanchonete Online</Text>
      
      <Text style={styles.subtitle}>Cadastro do Cliente</Text>

      {/* Campo de Nome */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={24} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Nome"
          value={customer.name}
          onChangeText={(text) => setCustomer({ ...customer, name: text })}
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      {/* Campo de Telefone */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="phone" size={24} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Telefone"
          value={customer.phone}
          onChangeText={(text) => setCustomer({ ...customer, phone: text })}
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>

      {/* Botão Personalizado */}
      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={() => router.push({ pathname: "/menu", params: { customer: JSON.stringify(customer) } })}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Ver Cardápio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Fundo claro
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Cor escura para o título
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 30,
    color: "#555", // Cor mais suave para o subtítulo
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff", // Fundo branco para os inputs
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra no Android
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333", // Cor do texto
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50", // Verde para o botão
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Sombra no Android
  },
  buttonDisabled: {
    backgroundColor: "#a5d6a7", // Verde mais claro para o botão desabilitado
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // Texto branco
  },
});