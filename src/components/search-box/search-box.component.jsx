import { Form, FormControl } from "react-bootstrap";
import "./search-box.styles.css";

const SearchBox = ({ className, placeholder, onChangeHandler }) => (
  <>
    <Form >
      <FormControl
        className={`search-box ${className} `}
        type="search"
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </Form>
  </>
);

export default SearchBox;