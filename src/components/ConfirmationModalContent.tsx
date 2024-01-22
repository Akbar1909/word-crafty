import {StyleSheet, Text, View, Button, Pressable} from 'react-native';
import React, {FC} from 'react';
import tw from 'twrnc';

interface ConfirmationModalContentProps {
  renderContent: any;
  handleNo: () => void;
  handleOk: () => void;
  isPending?: boolean;
}

const ConfirmationModalContent: FC<ConfirmationModalContentProps> = ({
  renderContent,
  handleNo,
  handleOk,
  isPending,
}) => {
  return (
    <View style={tw`py-5`}>
      {renderContent}
      <View style={tw`flex flex-row items-center justify-center mt-2`}>
        <Pressable
          onPress={handleNo}
          style={tw`mr-4 flex items-center justify-center border border-gray-300 w-20 py-2 rounded-xl`}>
          <Text>No</Text>
        </Pressable>
        <Pressable
          onPress={handleOk}
          style={tw`border items-center justify-center border-gray-300 w-20 py-2 rounded-xl`}>
          <Text style={tw`text-red-900`}>Yes</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConfirmationModalContent;

const styles = StyleSheet.create({});
