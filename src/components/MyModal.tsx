import React, {FC} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';

interface MyModalProps {
  isVisible: boolean;
  children: any;
  handleClose: () => void;
}

const MyModal: FC<MyModalProps> = ({isVisible, children, handleClose}) => {
  return (
    <View>
      <Modal
        animationIn="fadeInLeft"
        animationOut="fadeOutRight"
        onBackdropPress={handleClose}
        style={tw`flex items-center justify-center`}
        isVisible={isVisible}>
        <View
          style={tw`bg-white items-center justify-center rounded-xl w-8/12`}>
          {children}
        </View>
      </Modal>
    </View>
  );
};

export default MyModal;
