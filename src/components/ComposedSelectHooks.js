import React, { useContext, useState, useEffect, useRef } from "react";
import { ReactComponent as Arrow } from "../assets/icons/arrow-down-sign-to-navigate.svg";
import { StoreContext } from "../Store";

const Select = props => {
  const inputBox = useRef(null);
  const nodeRef = useRef(null);
  const [state, dispatch] = useContext(StoreContext);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputWidth, setInputWidth] = useState(2);
  const [selectedValues, setSelectedValues] = useState([]);
  const [singleSelectedValue, setSingleSelectedValue] = useState("");
  const [singleSelectedLabel, setSingleSelectedLabel] = useState("");
  const [options, setOptions] = useState([
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "coffee", label: "Coffee" },
    { value: "tea", label: "Tea" },
    { value: "cola", label: "Cola" },
    { value: "fanta", label: "Fanta" },
    { value: "cheesecake", label: "Cheesecake" },
    { value: "brownie", label: "Brownie" }
  ]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, false);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, false);
    };
  });

  const handleClickOutside = e => {
    if (nodeRef.current.contains(e.target)) {
      return;
    }
    setShowDropdown(false);
  };

  const changeHandler = e => {
    setInputValue(e.target.value.trim());
    setShowDropdown(true);
  };

  const removeFromSelected = option => {
    console.log(options);
    const DropdownOptions = [...options, option];
    const selectedMultiValues = selectedValues.filter(
      item => item.value !== option.value
    );

    setOptions(DropdownOptions);
    setSelectedValues(selectedMultiValues);
    dispatch({ type: "REMOVE_SELECTION", payload: option });
  };

  const changeMultiSelectedValue = option => {
    const dropdownoptions = options.filter(item => item.value !== option.value);

    const selectedItems = [...selectedValues, option];

    setSelectedValues(selectedItems);
    setOptions(dropdownoptions);
    setShowDropdown(false);
    setInputWidth(2);
    setInputValue("");
    dispatch({ type: "ADD_SELECTION", payload: option });
  };

  const changeSingleSelectedValue = option => {
    setSingleSelectedValue(option.value);
    setSingleSelectedLabel(option.label);
    dispatch({ type: "CHANGE_SINGLE_SELECTION", payload: option.label });
    setShowDropdown(false);
    setInputWidth(2);
    setInputValue("");
  };

  const setTextInputWidth = e => {
    console.log(e.keyCode);
    setSingleSelectedLabel("");
    if (e.keyCode === 8) {
      if (inputWidth > 2) {
        setInputWidth(inputWidth - 9);
      }
      if (!inputValue) {
        setInputWidth(2);
      }
      return;
    }

    setInputWidth(inputWidth + 9);
  };

  const filterDropdownOptions = () => {
    return options.filter(option =>
      option.value.includes(inputValue.toLowerCase())
    );
  };

  const handleEventDelegation = e => {
    setShowDropdown(true);
    inputBox.current.focus();
  };

  const showHideClassName = showDropdown
    ? "dropdown active"
    : "dropdown inactive";

  const filteredOptions = filterDropdownOptions(inputValue);
  return (
    <div>
      <div className="select" ref={nodeRef}>
        <div
          className="select__container"
          onClick={e => handleEventDelegation(e)}
          style={{
            border: showDropdown ? "2px solid #1564d0" : "2px solid #f5f5f5"
          }}
        >
          <div className="select__container--value">
            {props.multiSelect &&
              selectedValues.map((item, index) => (
                <div className="selected__value" key={index}>
                  <div className="multi__value">{item.label}</div>
                  <div
                    className="multi__value--remove"
                    onClick={() => removeFromSelected(item)}
                  >
                    &times;
                  </div>
                </div>
              ))}
            {props.singleSelect && singleSelectedLabel}
            <div className="select__container--input">
              <input
                type="text"
                ref={inputBox}
                value={inputValue}
                onChange={e => {
                  setInputValue(e.target.value.trim());
                }}
                onKeyPress={e => setTextInputWidth(e)}
                onKeyDown={e => setTextInputWidth(e)}
                style={{ width: inputWidth }}
              />
            </div>
          </div>

          <Arrow className="select__container--icon" />
        </div>

        <div className={showHideClassName}>
          <ul>
            {filteredOptions.length === 0 ? (
              <li>No options</li>
            ) : (
              filteredOptions.map((option, index) => {
                const selected = option.value === singleSelectedValue.value;
                const styles = { background: "#1564d0", color: "white" };

                return (
                  <li
                    key={index}
                    onClick={() => {
                      props.multiSelect
                        ? changeMultiSelectedValue(option)
                        : changeSingleSelectedValue(option);
                    }}
                    style={selected ? styles : {}}
                  >
                    {option.label}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
