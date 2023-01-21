import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { styles } from "../constants/Styles";
import { useTheme } from "@react-navigation/native";
import CustomSwitch from "../components/CustomSwitch";
import RPC from "../../ethersRPC"; // for using ethers.js
import { toast } from "@backpackapp-io/react-native-toast";
import { Feather } from "@expo/vector-icons";
import { VideoEditor } from "../components/VideoEditor";
import * as DocumentPicker from "expo-document-picker";

export default function HomeScreen({ navigation }) {
  const [selectTab, setSelectTab] = useState(1);
  const [refreshing, setRefreshing] = useState(true);
  const { colors } = useTheme();
  const [selectedVideo, setSelectedVideo] = useState();

  //Expo document picker
  const _pickDocument = async () => {
    await DocumentPicker.getDocumentAsync({
      // DocumentPickerOptions
      type: ["image/*, video/*"]
    })
      .then((data) => {
        // alert(data);
        setSelectedVideo(data);
        // Format URI
        // Upload to IPFS via Storage.NFT
        // Return IPFS Hash
        // Mint Token on XRP
        console.log(data);
      });
  }


  return (
    <SafeAreaView>
         <Button
              title="Select Document"
              onPress={_pickDocument}
            />
            {selectedVideo !== undefined &&
              <View>
                <Text>Name: {selectedVideo.name.toString()}</Text>
                <Text>Size: {selectedVideo.size.toString()}</Text>
                <Text>URI: {selectedVideo.uri.toString()}</Text>
                <VideoEditor/>
              </View>}
    </SafeAreaView >
  );
}
