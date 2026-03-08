/*
  Zdefiniuj typowanie propsów dla CustomButton, które pozwoli na przekazanie dowolnych atrybutów elementu HTML button.
*/
import { ComponentProps } from 'react';

type CustomButtonProps = ComponentProps<'button'>;
const CustomButton = ({ children }: CustomButtonProps) => (
  <button className="p-2 text-white bg-blue-500 rounded-md">{children}</button>
);

// Przykładowe użycie komponentu Card
const App = () => (
  <CustomButton onClick={() => alert('clicked')} type="button">
    Click me
  </CustomButton>
);

export default App;

export { CustomButton };
