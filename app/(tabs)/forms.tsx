import React, { useEffect, useState } from "react"; 
import { 
  View, 
  TextInput, 
  Text, 
  Button, 
  StyleSheet, 
  Platform,
  ScrollView,
  Alert, 
} from "react-native"; 
import { Picker } from "@react-native-picker/picker"; 
import DateTimePicker from "@react-native-community/datetimepicker"; 
import {
addPerson,
getPersons,
updatePerson,
deletePerson,
initializeDB,
Person,
} from "@/database"; // Import initializeDB
  
const Forms = () => { 
  // States for inputs 
  const [firtName, setFirtName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [phone, setPhone] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [gender, setGender] = useState("Select Gender"); 
  const [date, setDate] = useState(new Date()); 
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null); 
  const [maritalStatus, setMaritalStatus] = React.useState('neverMarried');
  const [citizenship, setCitizenship] = React.useState('pngCitizen');
  
  const onChangeDate = ( 
    event: { nativeEvent: { timestamp: number } }, 
    selectedDate?: Date 
  ) => { 
    const currentDate = selectedDate || date; 
    setShowDatePicker(Platform.OS === "ios"); 
    setDate(currentDate); 
  }; 
  const fetchPersons = async () => {
    const allPersons = await getPersons();
    setPersons(allPersons);
  };
  useEffect(() => {
  const setupDatabase = async () => {
  await initializeDB();
  fetchPersons();
  };
  setupDatabase();
  }, []);
  const handleSubmit = async () => {
  if (
  !firtName ||
  !lastName ||
  !phone ||
  !email ||
  gender === "Select Gender"
  ) {
  Alert.alert("Error", "Please fill in all fields correctly.");
  return;
  }
  try {
  if (editingPersonId) {
  // Update existing person
  await updatePerson(
  editingPersonId,
  firtName,
  lastName,
  phone,
  email,
  date.toISOString(),
  gender
  );
  console.log("Person updated successfully");
  } else {
  // Add new person
  const id = await addPerson(
  firtName,
  lastName,
  phone,
  email,
  date.toISOString(),
  gender
  );
  console.log("Person created successfully with ID:", id);
  }
  resetForm();
fetchPersons(); // Refresh the list
} catch (error) {
console.error("Error submitting person:", error);
}
};
const handleDelete = async (id: number) => {
try {
await deletePerson(id);
console.log("Person deleted successfully");
fetchPersons(); // Refresh the list after deleting
} catch (error) {
console.error("Error deleting person:", error);
}
};
const handleUpdateClick = (person: Person) => {
// Populate the form with the selected person's data
setFirtName(person.firstName);
setLastName(person.lastName);
setPhone(person.phone);
setEmail(person.email);
setGender(person.gender);
setDate(new Date(person.date)); // Assuming dateOfBirth is a string
setEditingPersonId(person.id); // Set the ID for updating
};
const resetForm = () => {
// Clear the form after submission or update
  setFirtName("");
setLastName("");
setPhone("");
setEmail("");
setGender("Select Gender");
setDate(new Date());
setEditingPersonId(null); // Reset ID for creating new entries
};
 
 
  return ( 

    <ScrollView>
    <View style={styles.container}> 
      <Text style={styles.header}>Data Entry Form 📝</Text>

      <Text style={styles.header}>Personal Details 😊</Text>



      {/* Text Input 1 */} 
      <TextInput 
        style={styles.input} 
        placeholder="Enter First Name" 
        value={firtName} 
        onChangeText={setFirtName} 
        placeholderTextColor="#888" // Modern touch: lighter placeholder color 
      /> 
 
      {/* Text Input 2 */} 
      <TextInput 
        style={styles.input} 
        placeholder="Enter Last Name" 
        value={lastName} 
        onChangeText={setLastName} 
        placeholderTextColor="#888" 
      /> 
 
      {/* Number Input */} 
      <TextInput 
        style={styles.input} 
        placeholder="Enter a number" 
        value={phone} 
        onChangeText={setPhone} 
        keyboardType="numeric" 
        placeholderTextColor="#888" 
      /> 
 
      {/* Email Input */} 
      <TextInput 
        style={styles.input} 
        placeholder="Enter email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
        autoCapitalize="none" // Emails are typically lowercase 
        placeholderTextColor="#888" 
      /> 
 
      {/* Dropdown Picker */} 
      <Picker 
        selectedValue={gender} 
        onValueChange={(itemValue) => setGender(itemValue)} 
        style={styles.picker} 
      > 
        <Picker.Item label={"Select Gender"} /> 
        <Picker.Item label="Male" value="male" /> 
        <Picker.Item label="Female" value="female" /> 
        <Picker.Item label="Other" value="other" /> 
      </Picker> 
 
      {/* Date Picker */} 
      <View> 
        <Button 
          title="Select Date of Birth" 
          onPress={() => setShowDatePicker(true)} 
        ></Button> 
        {showDatePicker && ( 
          <DateTimePicker 
            value={date} 
            mode="date" 
            display="default" 
            onChange={onChangeDate} 
          /> 
        )} 
        <Text style={styles.dateText}> 
          Date of Birth: {date.toDateString()} 
        </Text> 
      </View> 
 
     
      <Text style={styles.header}>Indicative Information 📊</Text>
      <TextInput style={styles.input} placeholder="Province" />
      <TextInput style={styles.input} placeholder="District" />
      <TextInput style={styles.input} placeholder="Local Level Government (LLG)" />
      <TextInput style={styles.input} placeholder="Enter Your LLG" />
      <TextInput style={styles.input} placeholder="Custom Area Name" />
      <TextInput style={styles.input} placeholder="Locality" />
     


      <Text style={styles.header}>HOUSEHOLD INFORMATION 🏠</Text>
      <TextInput style={styles.input} placeholder="Number of Household Members" />
      <TextInput style={styles.input} placeholder="Street" />
      <TextInput style={styles.input} placeholder="City" />
      <TextInput style={styles.input} placeholder="Province" />
      <TextInput style={styles.input} placeholder="Postal Address" />
      

      <Text style={[styles.header, { color: 'black' }]}> EMPLOYMENT STATUS 🧑‍💼</Text>
      <TextInput
        style={styles.input}placeholder="Occupation"/>
      <TextInput
        style={styles.input}placeholder="Employer Name"/>
      <TextInput
        style={styles.input}placeholder="Monthly Income"/>
        <TextInput
        style={styles.input}
        placeholder="Employment Type (e.g., Full-time, Part-time)"/>
      
      <TextInput
        style={styles.input}
        placeholder="Job Start Date"/>
      
      <TextInput
        style={styles.input}
        placeholder="Job End Date (if applicable)"/>
      
      <TextInput
        style={styles.input}
        placeholder="Work Address"/>
      
      <TextInput
        style={styles.input}
        placeholder="Supervisor's Name"/> 


<Text style={[styles.header, { color: 'red' }]}>
  Thank You for Your Time! 👍
</Text>

      <Text style={styles.header}>You have successfully completed the Census form.</Text>
      

      <Button
          title={selectedPerson ? "Update" : "Submit"}
          onPress={handleSubmit}
          />
    </View> 
  
    </ScrollView>
    
  ); 
}; 
 
// Styling for a modern look 
const styles = StyleSheet.create({ 
  scrollView: {
    backgroundColor: '#f0f0f0', // Change this to your desired color
  },

  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f2f2f2",
    justifyContent: "center", 
  }, 
  header: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#333", // Darker text color for contrast 
    textAlign: "center", 
    marginBottom: 30, 
  }, 
  input: { 
    height: 50, 
    borderColor: "#ccc", 
    borderWidth: 1, 
    borderRadius: 12, // Rounded corners for a modern feel 
    paddingHorizontal: 15, 
    marginBottom: 20, 
    backgroundColor: "#fff", // White background for input fields 
    shadowColor: "#000", // Shadow for subtle elevation 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3, // Elevation on Android 
  }, 
  picker: { 
    height: 50, 
    borderColor: "#ccc", 
    borderWidth: 1, 
    borderRadius: 12, 
    backgroundColor: "#fff", 
    marginBottom: 20, 
  }, 
dateText: { 
marginTop: 10, 
marginBottom: 20, 
borderRadius: 12, 
fontSize: 16, 
color: "#666", // Subtle gray for date display 
}, 
buttonProps: { 
backgroundColor: "#0a7ea4", 
}, 
}); 
export default Forms;