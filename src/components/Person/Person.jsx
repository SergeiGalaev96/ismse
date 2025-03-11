import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import GridForm from "../GridForm/GridForm.jsx";
import Address from "../Address/Address.jsx";
// import NumberFormat from 'react-number-format';
// import PropTypes from 'prop-types';
import swal from 'sweetalert' // https://sweetalert.js.org/guides/
import Input from '@material-ui/core/Input';
import MaskedInput from 'react-text-mask';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";

import toast, { Toaster } from 'react-hot-toast'; // https://react-hot-toast.com/docs

// function NumberFormatCustom(props) {
//   const {inputRef, onChange, ...other} = props;

//   return (
//     <NumberFormat
//       {...other}
//       getInputRef={inputRef}
//       onValueChange={values => {
//         onChange({
//           target: {
//             value: values.value,
//           },
//         });
//       }}
//       decimalSeparator={','} 
//       isNumericString
//     />
//   );
// }

// NumberFormatCustom.propTypes = {
//   inputRef: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
// }
// function PassportSeriesMask(props) {
//   const { inputRef, ...other } = props;

//   return (
//     <MaskedInput
//       {...other}
//       ref={ref => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={[/[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/]}
//       placeholderChar={'\u2000'}
//     // showMask
//     />
//   );
// }
// function PassportNoMask(props) {
//   const { inputRef, ...other } = props;

//   return (
//     <MaskedInput
//       {...other}
//       ref={ref => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
//       placeholderChar={'\u2000'}
//     // showMask
//     />
//   );
// }
var showScanComponent = false
class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentViewForm: null,
      selectedDoc: null,
      subDocument: false,
      fieldValue: {},
      process_id: this.props.process_id,
      session_id: this.props.session_id,
      organizationId: this.props.organizationId,
      taskID: this.props.taskID,
      enumData: [],
      buttons: null,
      gridFormButtons: null,
      userId: this.props.userId,
      userRole: this.props.userRole,
      formType: null,
      formSize: 6,
      docList: null,
      size: this.props.size,
      page: this.props.page,
      ws: null,
      key: this.getUUID()
    }
    this.sendFieldValues = this.sendFieldValues.bind(this)
    this.clearTabData = this.clearTabData.bind(this)
    this.rowsPerPageChange = this.rowsPerPageChange.bind(this)
    this.rowsPageChange = this.rowsPageChange.bind(this)
    this.handleCloseCurrentTab = this.handleCloseCurrentTab.bind(this)
    // this.callSuccessToast = this.callSuccessToast.bind(this)
    // this.callErrorToast = this.callErrorToast.bind(this)
  }

  callSuccessToast(text) {
    toast.success(text, {
      duration: 3000,
      position: 'top-right',
    })
  }

  callErrorToast(text) {
    toast.error(text, {
      duration: 8000,
      position: 'top-right',
    })
  }

  handleCloseCurrentTab(process_id) {
    this.props.handleCloseCurrentTab(process_id)
  }

  clearTabData(process_id) {
    this.props.clearTabData(process_id)
  }
  async componentDidMount() {
    console.log("PERSON PROPS", this.props)
    if (this.state.documentViewForm === null) {
      this.setDataFromProps()
    }
  }
  async componentDidUpdate() {
    if (this.state.documentViewForm === null) {
      this.setDataFromProps()
    }
  }
  async setDataFromProps() {
    let fstate = this.state
    fstate.documentViewForm = this.props.documentViewForm

    fstate.formType = this.props.formType
    fstate.gridFormButtons = this.props.gridFormButtons
    if (this.props.docList !== null && this.props.docList !== "null" && this.props.docList !== undefined) {
      fstate.docList = JSON.parse(this.props.docList)
    }
    if (this.props.subDocument !== undefined) {
      fstate.subDocument = this.props.subDocument
      if (this.props.subDocument === true) {
        fstate.formSize = 12
      }
    }
    if (this.props.buttons !== undefined) {
      fstate.buttons = this.props.buttons
    }

    if (this.props.enumData !== undefined && this.props.enumData !== null) {
      fstate.enumData = this.props.enumData
      if (this.props.selectedDoc !== null && this.props.selectedDoc !== undefined) {
        fstate.selectedDoc = this.props.selectedDoc
        // console.log("SELDOC", this.props.selectedDoc)
        const docAttr = this.props.selectedDoc.attributes
        for (var i = 0; i < docAttr.length; i++) {
          fstate.fieldValue[docAttr[i].name] = docAttr[i].value
        }
        for (let i = 0; i < docAttr.length; i++) {
          fstate.fieldValue[docAttr[i].name] = docAttr[i].value
          if (this.state.enumData === null) {
            if (docAttr[i].type === "Enum") {
              fstate.fieldValue[docAttr[i].name] = docAttr[i].enumValueText
            }
          }
        }
      }
    }
    if (this.props.enumData === undefined || this.props.enumData === null) {
      fstate.enumData = null
    }
    this.setState(fstate)
    if (fstate.fieldValue["Country"] === undefined) {
      fstate.fieldValue["Country"] = "4170000000000"
    }
    this.setState(fstate)
  }
  sendFieldValues(commandJson) {
    this.props.sendFieldValues(commandJson)
  }
  // handleTextChange = (event) => {
  //   // console.log("TARGET", event.target)
  //   let fieldValue = this.state.fieldValue
  //   var name = event.target.name
  //   var value = event.target.value.trim()
  //   // console.log("MAXL", event.target.name, maxLength)
  //   if (name === "PassportSeries") {
  //     const regex = /[^a-zA-Z]/g;
  //     const newValue = value.replace(regex, "");
  //     if (value !== newValue) {
  //       this.callErrorToast("Поле \"Серия\" может содержать только латинские буквы A-Z!");
  //     }
  //     value = newValue
  //   }

  //   if (name === "PassportNo") {
  //     const regex = /[^0-9]/g;
  //     const newValue = value.replace(regex, "");
  //     if (value !== newValue) {
  //       this.callErrorToast("Поле \"Номер\" может содержать только цифры!");
  //     }
  //     value = newValue
  //   }

  //   let maxLength = this.checkLength(name)
  //   if (event.target.value.length > maxLength) {
  //     value = value.substring(0, maxLength)
  //     this.callErrorToast("Длинна данного поля не должна превышать" + maxLength + "символов!")
  //   }

  //   fieldValue[name] = value
  //   this.setState({ fieldValue: fieldValue, key: this.getUUID() })
  // }
  handleTextChange = (event) => {
    let fieldValue = { ...this.state.fieldValue }; // Создаем копию состояния
    const name = event.target.name;
    let value = event.target.value.trim(); // Убираем пробелы в начале и конце

    if (name === "PassportSeries") {
      const regex = /[^a-zA-Z]/g;
      const newValue = value.replace(regex, "");
      if (value !== newValue) {
        this.callErrorToast('Поле "Серия" может содержать только латинские буквы A-Z!');
      }
      value = newValue;
    }

    if (name === "PassportNo") {
      const regex = /[^0-9]/g;
      const newValue = value.replace(regex, "");
      if (value !== newValue) {
        this.callErrorToast('Поле "Номер" может содержать только цифры!');
      }
      value = newValue;
    }

    let maxLength = this.checkLength(name);
    if (value.length > maxLength) {
      this.callErrorToast(`Длина данного поля не должна превышать ${maxLength} символов!`);
      value = value.substring(0, maxLength); // Обрезаем значение после вывода ошибки
    }

    fieldValue[name] = value;

    this.setState({ fieldValue, key: this.getUUID() });
  };

  checkLength(name) {
    for (let i = 0; i < this.state.documentViewForm.attributes.length; i++) {
      if (name === this.state.documentViewForm.attributes[i].name) {
        return this.state.documentViewForm.attributes[i].maxLength
      }
    }
  }
  handleSelectChange = (event) => {
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = event.target.value
    this.setState({ fieldValue: fieldValue })
    if (this.state.subDocument === true) {
      this.props.changeSubDocument(event.target.name, event.target.value)
    }
    // this.callSuccessToast("2")
  }
  handleDateTimeChange(date, name) {
    // console.log("EV", date, name)
    let fieldValue = this.state.fieldValue
    if (date !== null) {
      var newDate = new Date(date)
      var dd = String(newDate.getDate()).padStart(2, '0')
      var mm = String(newDate.getMonth() + 1).padStart(2, '0') //January is 0!
      var yyyy = newDate.getFullYear()
      var convertedDate = String(dd + '.' + mm + '.' + yyyy)
      // console.log("CDATE", convertedDate)
      fieldValue[name] = convertedDate
      if (this.state.subDocument === true) this.props.changeSubDocument(name, convertedDate)
      this.setState({ fieldValue: fieldValue })
    }
    else {
      fieldValue[name] = undefined
      if (this.state.subDocument === true) this.props.changeSubDocument(name, convertedDate)
      this.setState({ fieldValue: fieldValue })
    }

    // let fieldValue = this.state.fieldValue
    // var newDate = new Date(event.target.value)
    // var dd = String(newDate.getDate()).padStart(2, '0')
    // var mm = String(newDate.getMonth() + 1).padStart(2, '0') //January is 0!
    // var yyyy = newDate.getFullYear()
    // var convertedDate = String(dd + '.' + mm + '.' + yyyy)
    // fieldValue[event.target.name] = convertedDate
    // if (this.state.subDocument === true)  this.props.changeSubDocument(event.target.name, convertedDate)
    // this.setState({fieldValue: fieldValue})
  }
  parseDate(date) {
    // Parsing DAteTime to appropriate format
    if (date !== undefined && date !== null) {
      var dd = date.substring(0, 2)
      var mm = date.substring(3, 5)
      var yyyy = date.substring(6, 10)
      var convertedDate = String(yyyy + '-' + mm + '-' + dd)
      var newDate = new Date(convertedDate) // "2017-01-26"
      dd = String(newDate.getDate()).padStart(2, '0')
      mm = String(newDate.getMonth() + 1).padStart(2, '0') //January is 0!
      yyyy = newDate.getFullYear()
      convertedDate = yyyy + '-' + mm + '-' + dd
    }
    // console.log("DATE", convertedDate)
    return convertedDate
  }
  getEnumValues(enumDef) {
    // Get items to show in "Select" component
    // console.log("ENUM value search", this.state.enumData)
    for (let i = 0; i < this.state.enumData.length; i++)
      if (this.state.enumData[i].enumDef === enumDef) {
        return this.state.enumData[i].data;
      }
    return null
  }
  rowsPerPageChange(size) {
    // Hendler of selected amount of rows to show on Table form
    const filterDocument = { attributes: this.getFieldValues() }
    const commandJson =
    {
      commandType: "completeTask",
      session_id: this.state.session_id,
      process_id: this.state.process_id,
      taskID: this.state.taskID,
      docDefId: this.state.documentViewForm.docDefId,
      variables: {
        userAction: { value: "findDocument" },
        doc: { value: JSON.stringify(filterDocument) },
        size: { value: size },
        page: { value: 1 }
      }
    }
    this.sendFieldValues(commandJson)
  }
  getButton(button, index) {
    // Create buttons related to form
    if (button.name === "attachDocument")
      return (
        showScanComponent = true
      )
    else
      return (
        <Button
          name={button.name}
          variant="outlined"
          style={{
            margin: 3,
            backgroundColor: button.backgroundColor,
            height: 32,
            fontSize: 12
          }}
          onClick={this.buttonClick}
          value={button.name}
        >
          {button.label}
        </Button>
      )
  }
  getFieldValuesNRSZ() {
    // Collect data to create document in NRSZ DB
    var attributes = {}
    // console.log("Docview form GET", this.state.documentViewForm)
    for (var key in this.state.fieldValue) {
      if (key !== "Country" && key !== "Region" && key !== "District") {
        if (key === "Date_of_Issue" || key === "Date_of_Birth") {
          attributes[key] = this.parseDate(this.state.fieldValue[key])
        }
        else attributes[key] = this.state.fieldValue[key]
      }
    }
    // console.log("Variables", attributes)
    return attributes
  }
  getFieldValues() {
    // Collect all data from form fields
    var attributes = []
    // console.log("Docview form GET", this.state.documentViewForm)
    for (var key in this.state.fieldValue) {
      if (key !== "Country" && key !== "Region" && key !== "District") {
        for (let i = 0; i < this.state.documentViewForm.attributes.length; i++) {
          if (key === this.state.documentViewForm.attributes[i].name) {
            attributes.push({
              name: this.state.documentViewForm.attributes[i].name,
              value: this.state.fieldValue[key],
              type: this.state.documentViewForm.attributes[i].type,
            })
          }
        }
      }
      // console.log("item",key)
    }
    // console.log("Variables", attributes)
    return attributes
  }
  getFieldValuesToCreateDoc() {
    // Collect all data from form fields
    var attributes = []
    // console.log("Docview form GET", this.state.documentViewForm)
    for (var key in this.state.fieldValue) {
      if (key !== "IIN") {
        for (let i = 0; i < this.state.documentViewForm.attributes.length; i++) {
          if (key === this.state.documentViewForm.attributes[i].name) {
            attributes.push({
              name: this.state.documentViewForm.attributes[i].name,
              value: this.state.fieldValue[key],
              type: this.state.documentViewForm.attributes[i].type,
            })
          }
        }
      }
    }
    return attributes
  }
  checkForEmptyFields(commandJson) {
    // Controls on obligated fields
    if (this.state.fieldValue["Last_Name"] !== "" && this.state.fieldValue["Last_Name"] !== undefined) {
      if (this.state.fieldValue["Date_of_Birth"] !== "01.01.1970" && this.state.fieldValue["Date_of_Birth"] !== undefined) {
        if (this.state.fieldValue["Sex"] !== null && this.state.fieldValue["Sex"] !== undefined) {
          if (this.state.fieldValue["FamilyState"] !== null && this.state.fieldValue["FamilyState"] !== undefined) {
            if (this.state.fieldValue["PassportType"] !== null && this.state.fieldValue["PassportType"] !== undefined) {
              if (this.state.fieldValue["PassportSeries"] !== "" && this.state.fieldValue["PassportSeries"] !== undefined) {
                if (this.state.fieldValue["PassportNo"] !== "" && this.state.fieldValue["PassportNo"] !== undefined) {
                  if (this.state.fieldValue["Issuing_Authority"] !== "" && this.state.fieldValue["Issuing_Authority"] !== undefined) {
                    if (this.state.fieldValue["Date_of_Issue"] !== "01.01.1970" && this.state.fieldValue["Date_of_Issue"] !== undefined) {
                      if (this.state.fieldValue["Region"] !== null && this.state.fieldValue["Region"] !== undefined) {
                        if (this.state.fieldValue["District"] !== null && this.state.fieldValue["District"] !== undefined) {
                          // this.sendFieldValues(commandJson)
                          // this.clearTabData(this.state.process_id)
                          this.chekForExsistedPersonPassport(commandJson)
                        } else this.callErrorToast("Заполните поле \"Район\"")
                      } else this.callErrorToast("Заполните поле \"Область\"")
                    } else this.callErrorToast("Заполните поле \"Дата выдачи\"")
                  } else this.callErrorToast("Заполните поле \"Выдавший орган\"")
                } else this.callErrorToast("Заполните поле \"Номер\"")
              } else this.callErrorToast("Заполните поле \"Серия\"")
            } else this.callErrorToast("Заполните поле \"Типы удостоверяющих документов\"")
          } else this.callErrorToast("Заполните поле \"Семейное положение\"")
        } else this.callErrorToast("Заполните поле \"Пол\"")
      } else this.callErrorToast("Заполните поле \"Дата рождения\"")
    } else this.callErrorToast("Заполните поле \"Фамилия\"")
  }
  async chekForExsistedPersonPassport(commandJson) {
    var Passport = { attributes: [{ name: "PassportSeries", value: this.state.fieldValue["PassportSeries"], type: "Text" }, { name: "PassportNo", value: this.state.fieldValue["PassportNo"], type: "Text" }] }
    await fetch("api/Document/FilterDocumentsByDefId?defId=" + this.state.documentViewForm.docDefId + "&size=10&page=1&userId=" + this.state.userId, {
      headers: {
        "Accept": "application/x-www-form-urlencoded",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(Passport),
      // mode: 'no-cors'
    })
      .then(response => {
        console.log("CHK PASPORT", response)
        response.text().then(string => {
          var document = JSON.parse(string)
          if (document.length === 0) {
            // this.clearTabData(this.state.process_id)
            // this.sendFieldValues(commandJson)
          }
          else this.swAlert("Гражданин с таким номером пасспорта уже существует!")
          // console.log("RESPONSE", document)
        })
      })
  }
  getUUID() {
    const uuidv1 = require("uuid/v1")
    return uuidv1()
  }
  swAlert(text) {
    return (
      swal({
        text: text,
        icon: "warning",
        buttons: { ok: "Ок" },
        // dangerMode: true,
      })
        .then((click) => {
          if (click === "ok") {
            console.log("CLICK OK", click)
          }
        })
    )
  }
  getPersonAge() {
    var birthday = new Date(this.parseDate(this.state.fieldValue["Date_of_Birth"]))
    var ageDifMs = Date.now() - birthday.getTime()
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var fullAge = Math.abs(ageDate.getUTCFullYear() - 1970)
    console.log("AGE", fullAge)
    return fullAge
  }
  buttonClick = (event) => {
    // console.log("Event", event.currentTarget.name)
    if (event.currentTarget.name === "findDocument") {
      const filterDocument = { attributes: this.getFieldValues() }
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        docDefId: this.state.documentViewForm.docDefId,
        variables: {
          userAction: { value: "findDocument" },
          doc: { value: JSON.stringify(filterDocument) },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole },
          size: { value: 10 },
          page: { value: 1 }
        }
      }
      console.log("button findDocument Person: ", commandJson)
      this.sendFieldValues(commandJson)
    }
    else if (event.currentTarget.name === "createDocument") {
      const createDocument = { attributes: this.getFieldValuesToCreateDoc() }
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "createDocument" },
          doc: { value: JSON.stringify(createDocument) },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole }
        }
      }
      console.log("Create Document: ", commandJson)
      this.clearTabData(this.state.process_id)
      // this.setState({documentViewForm: null})
      this.sendFieldValues(commandJson)
    }
    else if (event.currentTarget.name === "saveDocument") {
      const createDocumentNRSZ = this.getFieldValuesNRSZ()
      const createDocument = { attributes: this.getFieldValues() }
      let age = this.getPersonAge()
      const Adult = (age >= 18) ? "True" : "False"
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "saveDocument" },
          docNRSZ: { value: JSON.stringify(createDocumentNRSZ) },
          doc: { value: JSON.stringify(createDocument) },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole },
          docDefId: { value: this.state.documentViewForm.docDefId },
          regionNo: { value: this.state.fieldValue["Region"] },
          districtNo: { value: this.state.fieldValue["District"] },
          adult: { value: Adult }
        }
      }
      console.log("button saveDocument: ", commandJson)
      // this.clearTabData(this.state.process_id)
      this.checkForEmptyFields(commandJson)
    }
    else if (event.currentTarget.name === "deleteDocument") {
      // const filterDocument = {attributes: this.getFieldValues()}
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "deleteDocument" },
          docId: { value: this.state.selectedDoc.id },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole }
        }
      }
      console.log("button deleteDocument: ", commandJson)
      this.sendFieldValues(commandJson)
    }
    else if (event.currentTarget.name === "updateDocument") {
      const updateDocument = { attributes: this.getFieldValues() }
      let age = this.getPersonAge()
      const Adult = (age >= 18) ? "True" : "False"
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "updateDocument" },
          doc: { value: JSON.stringify(updateDocument) },
          personId: { value: this.state.selectedDoc.id },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole },
          adult: { value: Adult }
        }
      }
      console.log("button updateDocument: ", commandJson)
      this.sendFieldValues(commandJson)
    }
    else if (event.currentTarget.name === "cancel") {
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "cancel" },
          docId: { value: "null" }
        }
      }
      this.sendFieldValues(commandJson)
      // this.clearTabData(this.state.process_id)
      // this.closeTab(this.state.process_id)
      console.log("Button cancel", commandJson)
    }
    else if (event.currentTarget.name === "back") {
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: { userAction: { value: "back" } }
      }
      this.sendFieldValues(commandJson)
      console.log("Button back")
    }
  }
  rowsPageChange(size, page) {
    // console.log("Rows changed: ", size)
    const filterDocument = { attributes: this.getFieldValues() }
    const commandJson =
    {
      commandType: "completeTask",
      session_id: this.state.session_id,
      process_id: this.state.process_id,
      taskID: this.state.taskID,
      docDefId: this.state.documentViewForm.docDefId,
      variables: {
        userAction: { value: "findDocument" },
        doc: { value: JSON.stringify(filterDocument) },
        size: { value: size },
        page: { value: page }
      }
    }
    // console.log("JSON Collected: ", commandJson)
    this.sendFieldValues(commandJson)
  }
  countryChange = (event) => {
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = event.target.value
    fieldValue["Region"] = null
    fieldValue["District"] = null
    // console.log("Country selected", event.target.name)
    this.setState({ fieldValue: fieldValue })
  }
  regionChange = (event) => {
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = event.target.value
    fieldValue["District"] = null
    // console.log("Region selected", event.target.name)
    this.setState({ fieldValue: fieldValue })
  }
  districtChange = (event) => {
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = event.target.value
    // console.log("District selected", event.target.name)
    this.setState({ fieldValue: fieldValue })
  }
  passportSeriesChange = (event) => {
    // event.preventDefault()
    var value = event.target.value.trim()
    // console.log("PasportSer", event.target.value)
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = value
    this.setState({ fieldValue: fieldValue })
    // if(value === "\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000"){
    //   // console.log("PasportSer null")
    //   let fieldValue = this.state.fieldValue
    //   fieldValue[event.target.name] = null
    //   this.setState({fieldValue: fieldValue})
    // }
    // else{
    //   for(let i=value.length; i>0; i--){
    //     let lastChar = value.substring(i -1, i)
    //     // console.log("LAST", lastChar)
    //     if(lastChar !== '\u2000'){
    //       let fieldValue = this.state.fieldValue
    //       fieldValue[event.target.name] = value
    //       this.setState({fieldValue: fieldValue})
    //       break
    //     }
    //     value = value.substring(0, value.length -1)
    //   }
    // }
  }
  placeOfLivingChange = (event) => {
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = event.target.value
    fieldValue["District"] = null
    // console.log("Region selected", event.target.name)
    this.setState({ fieldValue: fieldValue })
  }
  getComponent(fieldItem) {
    // Create form component by it's "type"   
    if (fieldItem.type === "Text") {
      // if(fieldItem.name === "PassportNo"){
      //   return (
      //     // <TextField
      //     //   id = {"PassportNo"}
      //     //   disabled={(this.state.formType === "view" || fieldItem.edit === false) ? true : false}
      //     //   style={{minWidth: 220}}
      //     //   // defaultValue = {(this.state.fieldValue[fieldItem.name] !== undefined) ? this.state.fieldValue[fieldItem.name]: ""}
      //     //   value = {(this.state.fieldValue[fieldItem.name] !== undefined) ? this.state.fieldValue[fieldItem.name]: ""}
      //     //   // onChange = {this.componentIntChange}
      //     //   onBlur = {this.handleChange}
      //     //   name = {fieldItem.name}
      //     //   InputProps={{inputComponent: NumberFormat}}
      //     // />
      //     <FormControl>
      //       <Input
      //         name = {fieldItem.name}
      //         value = {(this.state.fieldValue[fieldItem.name] !== undefined) ? this.state.fieldValue[fieldItem.name]: ""}                onChange = {this.handleTextChange}
      //         onBlur = {this.passportSeriesChange}
      //         style={{minWidth: 260, maxWidth: 350, height: 30}}
      //         disabled={(this.props.formType === "view" || this.props.edit === false) ? true : false}
      //         inputComponent={PassportNoMask}
      //       />
      //     </FormControl>
      //   )
      // } 
      // if (fieldItem.name === "PassportSeries") {
      //   return (
      //     <FormControl>
      //       <Input
      //         name={fieldItem.name}
      //         value={(this.state.fieldValue[fieldItem.name] !== undefined) ? this.state.fieldValue[fieldItem.name] : ""} onChange={this.handleTextChange}
      //         onBlur={this.passportSeriesChange}
      //         style={{ width: "100%", height: 30 }}
      //         disabled={(this.props.formType === "view" || this.props.edit === false) ? true : false}
      //         inputComponent={PassportSeriesMask}
      //       />
      //     </FormControl>
      //   )
      // }
      // else {
      return (
        <TextField
          id={fieldItem.name}
          defaultValue={this.state.fieldValue[fieldItem.name] ? this.state.fieldValue[fieldItem.name] : ""}
          // onChange={this.handleTextChange}
          onBlur={this.handleTextChange}
          name={fieldItem.name}
          len={fieldItem.len}
          style={{ width: "100%" }}
          disabled={(this.state.formType === "view" || fieldItem.edit === false) ? true : false}
          size="small"
        />
      )
      // }
    }

    else if (fieldItem.type === "DateTime") {
      return (
        // <TextField
        //   type="date"
        //   onChange = {this.handleTextChange}
        //   onBlur = {this.handleDateTimeChange}
        //   name = {fieldItem.name}
        //   style={{minWidth: 200}}
        //   disabled={(this.state.formType === "view" || fieldItem.edit === false) ? true : false}
        //   defaultValue = {this.parseDate(this.state.fieldValue[fieldItem.name]) ? this.parseDate(this.state.fieldValue[fieldItem.name]) : "" }
        //   InputLabelProps={{
        //     shrink: true,
        //   }}
        //   size="small"
        // />
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <DatePicker
            clearable
            cancelLabel="Отмена"
            okLabel="Ок"
            clearLabel="Очистить"
            invalidDateMessage="неверный формат"
            name={fieldItem.name}
            margin="small"
            format="dd.MM.yyyy"
            disabled={(this.state.formType === "view" || fieldItem.edit === false) ? true : false}
            value={(this.state.fieldValue[fieldItem.name] !== undefined) ? this.parseDate(this.state.fieldValue[fieldItem.name]) : null}
            onChange={date => this.handleDateTimeChange(date, fieldItem.name)}
          />
        </MuiPickersUtilsProvider>
      )
    }
    else if (fieldItem.type === "Enum") {
      return (
        <FormControl
          variant="outlined"
          style={{ width: "100%" }}
        >
          <Select
            onChange={this.handleSelectChange}
            name={fieldItem.name}
            input={<OutlinedInput name={fieldItem.name} labelWidth={0} />}
            disabled={(this.state.formType === "view" || fieldItem.edit === false) ? true : false}
            value={(this.state.fieldValue[fieldItem.name]) ? this.state.fieldValue[fieldItem.name] : ""}
            menuPortalTarget={document.body}
            styles={{ height: 30, width: "100%", minWidth: 150, menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          >
            <MenuItem value={null}>
              <em></em>
            </MenuItem>
            {this.getEnumValues(fieldItem.enumDef).map((enumValue, index) => (
              <MenuItem
                key={index}
                value={enumValue.Id}
              >
                {enumValue.Text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    }
    else if (fieldItem.type === "Address") {
      return (
        <Address
          SOAT={this.props.SOAT}
          countryChange={this.countryChange}
          regionChange={this.regionChange}
          districtChange={this.districtChange}
          Country={this.state.fieldValue.Country}
          Region={this.state.fieldValue.Region}
          District={this.state.fieldValue.District}
          formType={"edit"}
          edit={true}
          formName={"AdultsIPRSearchForm"}
        />
      )
    }
  }
  render() {
    if (this.state.documentViewForm === null) return <LinearProgress />
    return (
      <Grid key={this.state.key}>
        <Grid container direction="row" justify="flex-start" spacing={0}>
          <Grid item xs={this.state.formSize}>
            <Card>
              <Table size="small" id="ViewForm">
                {this.state.subDocument === false &&
                  <TableHead style={{ backgroundColor: "#D3D3FE" }}>
                    <TableRow style={{ minHeight: 50 }}>
                      <TableCell style={{ color: "black", fontSize: 15, minHeight: 50 }}>Наименование</TableCell>
                      <TableCell style={{ color: "black", fontSize: 15, minHeight: 50 }}>Запись</TableCell>
                    </TableRow>
                  </TableHead>
                }
                <TableBody>
                  {this.state.documentViewForm.attributes.map((fieldItem, index) => (
                    <TableRow style={{ height: 30 }}>
                      {fieldItem.type !== "Address" &&
                        <TableCell
                          key="Caption"
                          align="left"
                          style={{ maxWidth: 160 }}
                        >
                          {fieldItem.caption}
                        </TableCell>
                      }
                      <TableCell
                        align="left"
                        style={{ maxWidth: 160 }}
                      >
                        {this.getComponent(fieldItem)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {this.state.buttons !== null &&
                this.state.buttons.map((button, index) => {
                  return this.getButton(button, index)
                })}
            </Card>
          </Grid>
        </Grid>
        <Grid>
          <br></br>
        </Grid>
        {this.state.docList === "[]" &&
          <div>Нет данных</div>
        }
        {this.state.docList !== null && this.state.docList !== "[]" &&
          <GridForm key="grid form"
            process_id={this.state.process_id}
            session_id={this.state.session_id}
            taskID={this.state.taskID}
            userId={this.state.userId}
            organizationId={this.state.organizationId}
            userRole={this.state.userRole}
            docList={this.state.docList}
            size={this.state.size}
            page={this.state.page}
            Form={this.state.documentViewForm}
            gridFormButtons={this.state.gridFormButtons}
            rowsPageChange={this.rowsPageChange}
            sendFieldValues={this.sendFieldValues}
            handleCloseCurrentTab={this.handleCloseCurrentTab}
            clearTabData={this.clearTabData}
          >
          </GridForm>
        }
      </Grid>
    )
  }
}
export default Person