import React, {FC} from 'react';

interface IHiddenProps {
  visible: boolean;
  children: any;
}

const Hidden: FC<IHiddenProps> = ({visible, children}) => {
  if (visible) {
    return children;
  }

  return null;
};

export default Hidden;
