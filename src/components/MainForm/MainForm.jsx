// Import material and react components
import React from "react";
import Select from 'react-select';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Import libraries
import TableToExcel from "@linways/table-to-excel"; // https://github.com/linways/table-to-excel
import swal from 'sweetalert' // https://sweetalert.js.org/guides/
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import moment from "moment";

// Import custom components
import Person from "../Person/Person.jsx";
import Address from "../Address/Address.jsx";
import GridForm from "../GridForm/GridForm.jsx";
import Download from "../Download/Download.jsx";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      decimalSeparator={","}
      isNumericString
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}
async function tableToPdf(tableId) {
  let mywindow = window.open('', 'PRINT', 'height=650, width=900, top=100, left=150');

  mywindow.document.write(`<html><head><title>${'Экспорт в PDF'}</title>`);
  mywindow.document.write('</head><body >');
  mywindow.document.write(document.getElementById(tableId).innerHTML);
  mywindow.document.write('</body></html>');

  mywindow.document.close(); // necessary for IE >= 10
  // mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  // mywindow.close();

  return true;
}
function RegNoMask(props) {
  const { inputRef, ...other } = props
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/, /[0-9-№]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}
// const useStyles = makeStyles((theme) => ({
//   paper: {
//     width: "100%",
//     height: 200,
//     overflow: 'auto',
//   },
//   button: {
//     // width: "5%",
//     margin: theme.spacing(0),
//   }
// }))
class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process_id: this.props.process_id,
      session_id: this.props.session_id,
      taskID: this.props.taskID,
      taskType: this.props.taskType,
      fieldValue: {},
      subDocument: {},
      enumData: this.props.enumData,
      Form: null,
      selectedDoc: JSON.parse(this.props.selectedDoc),
      docId: null,
      buttons: this.props.buttons,
      gridForm: null,
      IPRGridForm: this.props.IPRGridForm,
      gridFormButtons: null,
      userId: this.props.userId,
      userRole: this.props.userRole,
      organizationId: this.props.organizationId,
      formType: this.props.formType,
      person: null,
      personFormType: this.props.personFormType,
      personEnumData: this.props.personEnumData,
      documentViewForm: this.props.documentViewForm,
      docList: null,
      docListIPR: null,
      download: null,
      size: this.props.size,
      page: this.props.page,
      SOAT: null,
      // regNoMask: []

      // TRANSFER LIST
      transferList: { "cbd4b1f8-c225-48d6-997c-f2116f2d5122": [] },
      checked: { "cbd4b1f8-c225-48d6-997c-f2116f2d5122": [] },
      selectedTransferList: { "cbd4b1f8-c225-48d6-997c-f2116f2d5122": [] },
      // classes: useStyles()
    }
    this.sendFieldValues = this.sendFieldValues.bind(this)
    this.buttonClick = this.buttonClick.bind(this)
    this.parseDate = this.parseDate.bind(this)
    this.changeSubDocument = this.changeSubDocument.bind(this)
    this.rowsPageChange = this.rowsPageChange.bind(this)
    this.handleCloseCurrentTab = this.handleCloseCurrentTab.bind(this)
    this.clearTabData = this.clearTabData.bind(this)
    this.showScanComponentClick = this.showScanComponentClick.bind(this)
    this.pushNewBlobs = this.pushNewBlobs.bind(this)
    this.pushNewImages = this.pushNewImages.bind(this)
  }
  
  async componentDidMount() {
    console.log("MAIN FORM PROPS", this.props)
    // Set data from props to local state
    try {
      let fstate = this.state
      fstate.Form = this.props.Form
      fstate.gridForm = this.props.gridForm
      if (this.props.selectedDoc !== undefined && this.props.selectedDoc !== "null" && this.props.selectedDoc !== null) {
        var sDoc = JSON.parse(this.props.selectedDoc)
        console.log("S DOC", sDoc)
        //SET PERSON DATA TO PERSON
        if (this.props.taskType === "showIPRForm" || this.props.taskType === "showChildIPRForm") {
          for (let i = 0; i < sDoc.attributes.length; i++) {
            if (sDoc.attributes[i].name === "AdultsMedicalCart") {
              for (let l = 0; l < sDoc.attributes[i].subDocument.attributes.length; l++) {
                if (sDoc.attributes[i].subDocument.attributes[l].name === "Person") {
                  fstate.person = sDoc.attributes[i].subDocument.attributes[l].subDocument
                }
              }
            }
          }
        }
        else {
          for (let i = 0; i < sDoc.attributes.length; i++) {
            if (sDoc.attributes[i].name === "Person") {
              // console.log("PERSON", sDoc.attributes[i].subDocument)
              if (sDoc.attributes[i].subDocument !== null && sDoc.attributes[i].subDocument !== undefined) {
                fstate.person = sDoc.attributes[i].subDocument
              }
            }
          }
        }
        // SET FIELD VALUES
        for (let i = 0; i < sDoc.attributes.length; i++) {
          if (this.props.taskType === "showIPRForm" || this.props.taskType === "showChildIPRForm") {
            if (sDoc.attributes[i].name === "AdultsMedicalCart") {
              fstate.fieldValue.AdultsMedicalCart = sDoc.attributes[i].subDocument.id
              for (let l = 0; l < sDoc.attributes[i].subDocument.attributes.length; l++) {
                if (sDoc.attributes[i].subDocument.attributes[l].value !== null) {
                  fstate.fieldValue[sDoc.attributes[i].subDocument.attributes[l].name] = sDoc.attributes[i].subDocument.attributes[l].value
                }
              }
            }
            else {
              if (sDoc.attributes[i].value !== null) {
                fstate.fieldValue[sDoc.attributes[i].name] = sDoc.attributes[i].value
              }
            }
          }
          else {
            if (sDoc.attributes[i].value !== null) {
              fstate.fieldValue[sDoc.attributes[i].name] = sDoc.attributes[i].value
            }
          }
        }
      }
      // SET PERSON DATA INTO EMPTY IPR FORM
      if (this.props.person !== undefined && this.props.person !== "null" && this.props.person !== null) {
        var personData = JSON.parse(this.props.person)
        fstate.person = personData
        fstate.fieldValue.Person = personData.id
      }
      if (this.props.docList !== undefined && this.props.docList !== "[]") {
        fstate.docList = JSON.parse(this.props.docList)
      }
      if (this.props.docListIPR !== undefined && this.props.docListIPR !== "[]") {
        fstate.docListIPR = JSON.parse(this.props.docListIPR)
      }
      if (this.props.SOAT !== undefined) {
        fstate.SOAT = this.props.SOAT
      }
      if (this.props.gridFormButtons !== undefined) {
        fstate.gridFormButtons = this.props.gridFormButtons
      }
      if (this.props.docId !== null || this.props.docId !== "null" || this.props.docId !== undefined) {
        fstate.docId = this.props.docId
      }
      // this.setState(fstate)
      // UPDAETE SOME DATA if nesessary
      if (this.props.userAction === "reexamination") {
        // var newDate = new Date()
        // var dd = String(newDate.getDate()).padStart(2, '0')
        // var mm = String(newDate.getMonth() + 1).padStart(2, '0') //January is 0!
        // var yyyy = newDate.getFullYear()
        // var convertedDate = String(dd + '.' + mm + '.' + yyyy)
        console.log("REEX DATE", moment(new Date()).format("DD.MM.YYYY"))
        fstate.fieldValue["Date"] = moment(new Date()).format("DD.MM.YYYY")
        fstate.fieldValue["RegNoAct"] = null
        fstate.fieldValue["ExaminationPrRe"] = "8d71baae-b834-42e5-be87-7f5637cc46d8"
        fstate.fieldValue["goal1"] = false
        fstate.fieldValue["goal2"] = false
        fstate.fieldValue["goal3"] = false
        fstate.fieldValue["goal4"] = null
        fstate.fieldValue["goal5"] = false
        fstate.fieldValue["goal6"] = false
        fstate.fieldValue["goalAnother"] = null
        fstate.fieldValue["DisabilityGroup"] = null
        // fstate.fieldValue["ExamDateFrom"] = "NaN.NaN.NaN"	
        // fstate.fieldValue["ExamDateTo"] = "NaN.NaN.NaN"	
        // fstate.fieldValue["ExamStartDate"] = "NaN.NaN.NaN"
        // fstate.fieldValue["ExamOfDate"] = "NaN.NaN.NaN"
        // fstate.fieldValue["ExamFinishDate"] = "NaN.NaN.NaN"
        fstate.fieldValue["ExamDateFrom"] = undefined
        fstate.fieldValue["ExamDateTo"] = undefined
        fstate.fieldValue["ExamStartDate"] = undefined
        fstate.fieldValue["ExamOfDate"] = undefined
        fstate.fieldValue["ExamFinishDate"] = undefined
        fstate.fieldValue["ReferenceNumber"] = undefined
      }
      if (fstate.Form !== null) {
        if ((fstate.Form.formName === "AdultsIPRForm" || fstate.Form.formName === "ChildIPRForm") && fstate.fieldValue.AdultsMedicalCart === undefined) {
          fstate.fieldValue.AdultsMedicalCart = this.props.docId
        }
        if ((fstate.person === null || this.props.person !== "null") && fstate.Form.formName === "TransferMedicalCertificateForm" && this.props.docList !== "[]") {
          var docListData = JSON.parse(this.props.docList)
          // console.log("docListData", docListData)
          for (let l = 0; l < docListData[0].attributes.length; l++) {
            if (docListData[0].attributes[l].name === "Person") {
              fstate.person = docListData[0].attributes[l].subDocument
            }
          }
        }
        if (fstate.fieldValue["MseName"] === undefined &&
          fstate.Form.formName !== "TransferMedicalCertificateForm" &&
          fstate.Form.formName !== "AdultsDetailedSearchForm" &&
          fstate.Form.formName !== "AdultsIPRSearchForm" &&
          fstate.Form.formName !== "ChildDetailedSearchForm" &&
          fstate.Form.formName !== "AdultsIPRSearchForm" &&
          fstate.Form.formName !== "RegistrationSearchForm"
        ) {
          fstate.fieldValue["MseName"] = fstate.organizationId
        }
        // DISABLE 2 BLOCKS OF FORM /FROM INCOMING DATA
        if (fstate.fieldValue["Occupation"] !== "9d5a6ba0-c836-4dd0-b8d2-6cc2cfa8bdb8") {
          for (let i = 0; i < fstate.Form.sections.length; i++) {
            if (fstate.Form.sections[i].name === "HowToDoJob") {
              for (let l = 0; l < fstate.Form.sections[i].contents.length; l++) {
                fstate.Form.sections[i].contents[l].edit = false
                fstate.fieldValue[fstate.Form.sections[i].contents[l].name] = false
              }
            }
            else if (fstate.Form.sections[i].name === "WorkingConditions") {
              for (let l = 0; l < fstate.Form.sections[i].contents.length; l++) {
                fstate.Form.sections[i].contents[l].edit = false
                fstate.fieldValue[fstate.Form.sections[i].contents[l].name] = false
              }
            }
          }
        }
      }
      if (this.props.taskType === "showAdultsStatesSelectingForm") {
        fstate.fieldValue["userName"] = this.props.userFullName
      }
      if (fstate.fieldValue["Country"] === undefined && this.props.SOAT !== null && this.props.SOAT !== undefined) {
        fstate.fieldValue["Country"] = "4170000000000"
      }
      // SET PERSON DATA IF IT"S null
      if (fstate.person === null && (this.props.taskType === "showIPRForm" || this.props.taskType === "showChildIPRForm")) {
        if (fstate.fieldValue["IPRNo"] === undefined) {
          fstate.fieldValue["IPRNo"] = fstate.fieldValue["No"]
        }
        for (let l = 0; l < fstate.selectedDoc.attributes.length; l++) {
          if (fstate.selectedDoc.attributes[l].name === "Person") {
            fstate.person = fstate.selectedDoc.attributes[l].subDocument
            // fstate.fieldValue.Person = fstate.selectedDoc.attributes[l].subDocument.id
          }
        }
      }
      if (fstate.person === null && this.props.person !== undefined && this.props.person !== "null" && this.props.person !== null) {
        personData = JSON.parse(this.props.person)
        fstate.person = personData
        fstate.fieldValue.Person = personData.id
      }


      // SET DATE OF REGISTRATION DEFAULT CURRENT DAY
      if (this.props.taskType === "showRegForm" || this.props.taskType === "showChildRegForm" ||
        this.props.taskType === "showDetailedForm" || this.props.taskType === "showChildDetailedForm") {
        if (fstate.fieldValue["Date"] === undefined) {
          let newDate = new Date()
          let dd = String(newDate.getDate()).padStart(2, '0')
          let mm = String(newDate.getMonth() + 1).padStart(2, '0') //January is 0!
          let yyyy = newDate.getFullYear()
          let convertedDate = String(dd + '.' + mm + '.' + yyyy)
          fstate.fieldValue["Date"] = convertedDate
        }
      }

      let newTrListOpts = this.createTransferListOptions(this.props.Form, this.props.enumData)
      fstate.transferList = newTrListOpts.trList
      fstate.selectedTransferList = newTrListOpts.selTrList
      this.setState(fstate)
    }
    catch (er) {
      console.log("ERROR", er)
    }
  }
  async componentDidUpdate(prevProps) {
    // if (!this.state.Form) {
    //   this.setDataFromProps()
    // }
    if (this.state.download !== null) {
      if (this.state.download === "downloadExcel") {
        TableToExcel.convert(document.getElementById("TableToDownload"))
        this.setState({ download: null })
      }
      else {
        tableToPdf("TableToDownload")
        this.setState({ download: null })
      }
    }
  }

  handleCloseCurrentTab(process_id) {
    this.props.handleCloseCurrentTab(process_id)
  }
  showScanComponentClick() {
    this.props.showScanComponentClick()
  }
  sendFieldValues(commandJson) {
    this.props.sendFieldValues(commandJson)
  }
  pushNewBlobs(blobs) {
    this.props.pushNewBlobs(blobs)
  }
  pushNewImages(images) {
    this.props.pushNewImages(images)
  }


  createTransferListOptions(form, enums) {
    let newTransferList = {}
    let newSelectedTransferList = {}
    for (let s = 0; s < form.sections.length; s++) {
      for (let c = 0; c < form.sections[s].contents.length; c++) {
        if (form.sections[s].contents[c].type === "TransferList") {
          console.log("CREATE TRL", form.sections[s].contents[c].enumDef)
          let newTrItems = []
          let newSelTrItems = []
          let enumDef = form.sections[s].contents[c].enumDef
          for (let e = 0; e < enums.length; e++) {
            if (enums[e] !== null) {
              if (enums[e].enumDef === enumDef) {
                for (let d = 0; d < enums[e].data.length; d++) {
                  newTrItems.push(enums[e].data[d].Id)
                }
              }
            }
            else {
              this.props.callErrorToast("Ошибка сбора справочной информации " + form.sections[s].contents[c].label)
            }
          }
          newTransferList[enumDef] = newTrItems
          newSelectedTransferList[enumDef] = newSelTrItems
        }
      }
    }
    return (
      {
        trList: newTransferList,
        selTrList: newSelectedTransferList
      }
    )
  }

  async downloadDocument(type) {
    this.setState({ download: type })
  }
  // Delete close component and delete its data from hash stared in home component
  clearTabData(process_id) {
    this.props.clearTabData(process_id)
  }
  // Check field regNoAct if it's exist in database, it should be unique
  async checkForRegNoAct(commandJson, length) {
    if (this.state.fieldValue["RegNoAct"] !== "" && this.state.fieldValue["RegNoAct"] !== undefined) {
      this.props.callSuccessToast("Проверка № Медакта")
      var RegNoAct = { attributes: [{ name: "RegNoAct", value: this.state.fieldValue["RegNoAct"], type: "Text" }] }
      console.log("BODY", RegNoAct)
      await fetch("api/Document/FilterDocumentsByDefId?defId=" + this.state.Form.docDefId + "&size=3&page=1&userId=" + this.state.userId, {
        headers: {
          "Accept": "application/x-www-form-urlencoded",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(RegNoAct),
        // mode: 'no-cors'
      })
        .then(response => {
          response.text().then(stringResponse => {
            var document = JSON.parse(stringResponse)
            console.log("RESPONSE", document)
            // this.sendFieldValues(commandJson)
            if (document.length <= length) {
              console.log("LENGTH", document.length, length)
              this.sendFieldValues(commandJson)
              this.clearTabData(this.state.process_id)
              this.props.callSuccessToast("Проверка завершена!")
            }
            else {
              this.swAlert("Гражданин с таким № акта уже существует!")
            }
          })
        })
    }
    else { this.props.callErrorToast("Заполните поле \"№ акта по МСЭК\"") }
  }
  // Handle changing of person document fields if it is enabled for input and set values to local state
  changeSubDocument = (name, value) => {
    let subDoc = this.state.subDocument
    subDoc[name] = value
    this.setState({ subDocument: subDoc })
    console.log("Person Data", name, value)
  }
  // Returns random id
  getUUID() {
    const uuidv1 = require("uuid/v1")
    return uuidv1()
  }
  // Handling component changing without render all state, made for optimization
  componentChange = (event) => {
    console.log("COM CHANGE", event.target.name, event.target.value)
  }
  // Handling component changing with render state, used onBlur of component, made for optimization
  handleChange = (event) => {
    // console.log("HANDLE TEXT CHANGE", event.target.name, event.target.value)
    let fieldValue = this.state.fieldValue
    if (event.target.name === "RegNoAct") {
      let newValue = ""
      let regex = /[0-9-№]/
      for (let key in event.target.value) {
        if (regex.test(event.target.value[key]) === true) {
          newValue = newValue + event.target.value[key]
        }
      }
      fieldValue[event.target.name] = newValue
      // console.log("newValue", newValue, fieldValue)
    }
    else {
      fieldValue[event.target.name] = event.target.value
    }
    this.setState({ fieldValue: fieldValue })
  }
  // Controlling input in one field RegNoAct, create mask for inpur, field should accept only "№", "-" and all digits
  regNoChange = (event) => {
    // event.preventDefault()
    var value = event.target.value.trim()
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = value
    this.setState({ fieldValue: fieldValue })
    // console.log("REGNOACT", event.target.value)
    // if(event.target.value === "\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000\u2000"){
    //   console.log("REGNO null")
    //   let fieldValue = this.state.fieldValue
    //   fieldValue[event.target.name] = null
    //   this.setState({fieldValue: fieldValue})
    // }
    // else{
    //   for(let i=value.length; i>0; i--){
    //     let lastChar = value.substring(i -1, i)
    //     console.log("LAST", lastChar)
    //     if(lastChar !== '\u2000'){
    //       let fieldValue = this.state.fieldValue
    //       fieldValue[event.target.name] = value
    //       this.setState({fieldValue: fieldValue})
    //       break
    //     }
    //     value = value.substring(0, value.length -1)
    //   }
    // }
    // REGEX
    // let regex = /[0-9-]/
    // let lastChar = value.substring(value.length -1, value.length)
    // console.log("LAST", lastChar)
    // // let chars = event.target.value.split('')
    // // let char = chars.pop()

    // if(!regex.test(lastChar)){
    //   // value = chars.join('')
    //   console.log("not valid", lastChar)
    // }
    // else{
    //   let fieldValue = this.state.fieldValue
    //   fieldValue[event.target.name] = value
    //   this.setState({fieldValue: fieldValue})
    // }
  }
  // regNoKeyPress=(event)=>{
  //   let x = event.charCode
  //   console.log("CODE", x)
  // }
  // getRegNoMask(){
  //   let value = this.state.fieldValue["RegNoAct"] !== undefined ? this.state.fieldValue["RegNoAct"] : ""
  //   let valueLength = value.length
  //   console.log("VAL LEN", valueLength)
  //   let regex = /[1-9-]/
  //   let mask = []
  //   for(let i=0; i<valueLength; i++){
  //     mask.push(regex)
  //   }
  //   // let mask=[/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/,/[1-9-]/]
  //   return mask
  // }

  // Handler that control input of components with type of integer
  componentIntChange = (event) => {
    // console.log("CHANGE", event.target.name, event.target.value)
    if (event.target.value > 2147483646) {
      let value = event.target.value
      let maxValue = value.substring(0, value.length - 1)
      // console.log("SLICE", value, maxValue)
      let fieldValue = this.state.fieldValue
      fieldValue[event.target.name] = maxValue
      this.setState({ fieldValue: fieldValue })
    }

    // else{
    //   let fieldValue = this.state.fieldValue
    //   console.log("CHANGE", event.target.name, event.target.value)
    //   fieldValue[event.target.name] = event.target.value
    //   this.setState({fieldValue: fieldValue})
    // }
  }
  // Handler of select copmponet changes
  handleSelectChange = (event) => {
    let fstate = this.state
    if (event.name === "Occupation") {
      if (event.value === "9d5a6ba0-c836-4dd0-b8d2-6cc2cfa8bdb8") {
        for (let i = 0; i < fstate.Form.sections.length; i++) {
          if (fstate.Form.sections[i].name === "HowToDoJob") {
            for (let l = 0; l < fstate.Form.sections[i].contents.length; l++) {
              fstate.Form.sections[i].contents[l].edit = true
            }
          }
          else if (fstate.Form.sections[i].name === "WorkingConditions") {
            for (let l = 0; l < fstate.Form.sections[i].contents.length; l++) {
              fstate.Form.sections[i].contents[l].edit = true
            }
          }
        }
      }

      if (event.value !== "9d5a6ba0-c836-4dd0-b8d2-6cc2cfa8bdb8") {
        for (let i = 0; i < fstate.Form.sections.length; i++) {
          if (fstate.Form.sections[i].name === "HowToDoJob") {
            for (let l = 0; l < fstate.Form.sections[i].contents.length; l++) {
              fstate.Form.sections[i].contents[l].edit = false
              fstate.fieldValue[fstate.Form.sections[i].contents[l].name] = false
            }
          }
          else if (fstate.Form.sections[i].name === "WorkingConditions") {
            for (let l = 0; l < fstate.Form.sections[i].contents.length; l++) {
              fstate.Form.sections[i].contents[l].edit = false
              fstate.fieldValue[fstate.Form.sections[i].contents[l].name] = false
            }
          }
        }
      }
    }
    fstate.fieldValue[event.name] = event.value
    this.setState(fstate)
    console.log(`Option selected:`, event)
  }
  // 5 Hadlers that control changing of address data changing
  // countryChange =(event) => {
  //   let fieldValue = this.state.fieldValue
  //   fieldValue[event.target.name] = event.target.value
  //   fieldValue["Region"] = null
  //   fieldValue["District"] = null
  //   fieldValue["subDistrict"] = null
  //   fieldValue["Village"] = null
  //   console.log("Country selected", event.target.name)
  //   this.setState({fieldValue: fieldValue})
  // }
  regionChange = (event) => {
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = event.target.value
    fieldValue["District"] = null
    fieldValue["subDistrict"] = null
    fieldValue["Village"] = null
    console.log("Region selected", event.target.name)
    this.setState({ fieldValue: fieldValue })
  }
  districtChange = (event) => {
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = event.target.value
    fieldValue["subDistrict"] = null
    fieldValue["Village"] = null
    console.log("District selected", event.target.name)
    this.setState({ fieldValue: fieldValue })
  }
  subDistrictChange = (event) => {
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = event.target.value
    fieldValue["Village"] = null
    console.log("District selected", event.target.name)
    this.setState({ fieldValue: fieldValue })
  }
  villageChange = (event) => {
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = event.target.value
    console.log("Village selected", event.target.name)
    this.setState({ fieldValue: fieldValue })
  }
  placeOfLivingChange = (event) => {
    let fstate = this.state
    fstate.fieldValue[event.target.name] = event.target.value
    this.setState(fstate)
    console.log("placeOfLivingChange", event, fstate.fieldValue)
  }
  // DateTime component change handler
  handleDateTimeChange(date, name) {
    let fieldValue = this.state.fieldValue
    if (date !== null) {
      var newDate = new Date(date)
      var dd = String(newDate.getDate()).padStart(2, '0')
      var mm = String(newDate.getMonth() + 1).padStart(2, '0') //January is 0!
      var yyyy = newDate.getFullYear()
      var convertedDate = String(dd + '.' + mm + '.' + yyyy)
      // console.log("CDATE", convertedDate)
      fieldValue[name] = convertedDate
      this.setState({ fieldValue: fieldValue })
    }
    else {
      fieldValue[name] = undefined
      this.setState({ fieldValue: fieldValue })
    }

  }
  // Convert date to approptiate format
  parseDate(date) {
    if (date !== undefined) {
      var dd = date.substring(0, 2)
      var mm = date.substring(3, 5)
      var yyyy = date.substring(6, 10)
      var convertedDate = String(yyyy + '-' + mm + '-' + dd)
      var newDate = new Date(convertedDate) // "2020-01-26"
      dd = String(newDate.getDate()).padStart(2, '0')
      mm = String(newDate.getMonth() + 1).padStart(2, '0') //January is 0!
      yyyy = newDate.getFullYear()
      convertedDate = yyyy + '-' + mm + '-' + dd
    }
    // console.log("DATE", convertedDate)
    return convertedDate
  }

  handCheckboxChange = (event) => {
    let fieldValue = this.state.fieldValue
    fieldValue[event.target.name] = event.target.checked
    this.setState({ fieldValue: fieldValue })
    // console.log("new checkbox status", this.state.fieldValue[event.target.name])
  }
  // Get name of address by its code
  getAddressData(code) {
    for (var i = 0; i < this.state.SOAT.countries.length; i++) {
      if (code === this.state.SOAT.countries[i].code) {
        return this.state.SOAT.countries[i].name
      }
      else {
        for (var j = 0; j < this.state.SOAT.countries[i].regions.length; j++) {
          if (code === this.state.SOAT.countries[i].regions[j].code) {
            return this.state.SOAT.countries[i].regions[j].name
          }
          else {
            for (var k = 0; k < this.state.SOAT.countries[i].regions[j].districts.length; k++) {
              if (code === this.state.SOAT.countries[i].regions[j].districts[k].code) {
                return this.state.SOAT.countries[i].regions[j].districts[k].name
              }
              else {
                if (this.state.SOAT.countries[i].regions[j].districts[k].subDistricts !== undefined) {
                  for (var l = 0; l < this.state.SOAT.countries[i].regions[j].districts[k].subDistricts.length; l++) {
                    if (code === this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].code) {
                      return this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].name
                    }
                    else {
                      if (this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].villages !== undefined) {
                        for (var m = 0; m < this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].villages.length; m++) {
                          if (code === this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].villages[m].code) {
                            return this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].villages[m].name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // Collecting all field values and return as attributes
  getFieldValues() {
    var attributes = []
    if (this.state.taskType === "showIPRForm" || this.state.taskType === "showChildIPRForm") {
      console.log("IPR FORM")
      for (var key in this.state.fieldValue) {
        if (key === "AdultsMedicalCart") {
          attributes.push({
            name: "AdultsMedicalCart",
            value: this.state.fieldValue[key],
            type: "Doc",
          })
        }
        else if (key === "IPRNo") {
          attributes.push({
            name: "IPRNo",
            value: this.state.fieldValue[key],
            type: "Text",
          })
        }
        else {
          for (var section = 0; section < this.state.Form.sections.length; section++) {
            for (var item = 0; item < this.state.Form.sections[section].contents.length; item++) {
              if (key === this.state.Form.sections[section].contents[item].name) {
                if (this.state.Form.sections[section].contents[item].edit === true) {
                  attributes.push({
                    name: this.state.Form.sections[section].contents[item].name,
                    value: this.state.fieldValue[key],
                    type: this.state.Form.sections[section].contents[item].type,
                  })
                }
              }
            }
          }
        }
      }
    }
    else if (this.state.taskType === "showIPRSearchForm" || this.state.taskType === "showChildIPRSearchForm") {
      var subDocumentAttributes = []
      for (key in this.state.fieldValue) {
        if (this.state.fieldValue[key] !== null && this.state.fieldValue[key] !== "") {
          if (key === "Country") {
            subDocumentAttributes.push({
              name: "Country",
              value: this.state.fieldValue[key],
              type: "Text",
            })
          }
          else if (key === "Region") {
            subDocumentAttributes.push({
              name: "Region",
              value: this.state.fieldValue[key],
              type: "Text",
            })
          }
          else if (key === "District") {
            subDocumentAttributes.push({
              name: "District",
              value: this.state.fieldValue[key],
              type: "Text",
            })
          }
        }
        for (let section = 0; section < this.state.Form.sections.length; section++) {
          for (let item = 0; item < this.state.Form.sections[section].contents.length; item++) {
            if (key === this.state.Form.sections[section].contents[item].name) {
              subDocumentAttributes.push({
                name: this.state.Form.sections[section].contents[item].name,
                value: this.state.fieldValue[key],
                type: this.state.Form.sections[section].contents[item].type,
              })
            }
          }
        }
      }
      attributes.push({
        name: "AdultsMedicalCart",
        type: "Doc",
        docDef: this.state.Form.medicalCardDocDefId,
        "subDocument": {
          "attributes": subDocumentAttributes
        }
      })
      if (Object.keys(this.state.subDocument).length !== 0) {
        var subDocumentPersonAttributes = []
        for (var key in this.state.subDocument) {
          for (let i = 0; i < this.state.documentViewForm.attributes.length; i++) {
            if (key === this.state.documentViewForm.attributes[i].name) {
              subDocumentPersonAttributes.push({
                name: this.state.documentViewForm.attributes[i].name,
                value: this.state.subDocument[key],
                type: this.state.documentViewForm.attributes[i].type,
              })
              console.log("PUSHED", this.state.documentViewForm.attributes[i].name, this.state.subDocument[key])
            }
          }
        }
        attributes.subDocumentAttributes.push({
          name: "Person",
          type: "Doc",
          docDef: this.state.documentViewForm.docDefId,
          "subDocument": {
            "attributes": subDocumentPersonAttributes
          }
        })
      }
      console.log("IPRATRS", attributes)
    }
    else {
      // console.log("Fiel Values", this.state.fieldValue)
      for (key in this.state.fieldValue) {
        if (key === "Country") {
          attributes.push({
            name: "Country",
            value: this.state.fieldValue[key],
            enumValueText: this.getAddressData(this.state.fieldValue[key]),
            type: "Text",
          })
        }
        else if (key === "Region") {
          attributes.push({
            name: "Region",
            value: this.state.fieldValue[key],
            enumValueText: this.getAddressData(this.state.fieldValue[key]),
            type: "Text",
          })
        }
        else if (key === "District") {
          attributes.push({
            name: "District",
            value: this.state.fieldValue[key],
            enumValueText: this.getAddressData(this.state.fieldValue[key]),
            type: "Text",
          })
        }
        else if (key === "subDistrict") {
          attributes.push({
            name: "subDistrict",
            value: this.state.fieldValue[key],
            enumValueText: this.getAddressData(this.state.fieldValue[key]),
            type: "Text",
          })
        }
        else if (key === "Village") {
          attributes.push({
            name: "Village",
            value: this.state.fieldValue[key],
            enumValueText: this.getAddressData(this.state.fieldValue[key]),
            type: "Text",
          })
        }
        else if (key === "ResidentialAddress") {
          attributes.push({
            name: "ResidentialAddress",
            value: this.state.fieldValue[key],
            type: "Text",
          })
        }
        else if (key === "Phone") {
          attributes.push({
            name: "Phone",
            value: this.state.fieldValue[key],
            type: "Text",
          })
        }
        else if (key === "PlaceOfLiving") {
          attributes.push({
            name: "PlaceOfLiving",
            value: this.state.fieldValue[key],
            type: "Enum",
          })
        }
        
        else if (key === "Person") {
          attributes.push({
            name: "Person",
            value: this.state.fieldValue[key],
            type: "Doc",
          })
        }

        else {
          for (section = 0; section < this.state.Form.sections.length; section++) {
            for (item = 0; item < this.state.Form.sections[section].contents.length; item++) {
              if (key === this.state.Form.sections[section].contents[item].name) {
                attributes.push({
                  name: this.state.Form.sections[section].contents[item].name,
                  value: this.state.fieldValue[key],
                  type: this.state.Form.sections[section].contents[item].type
                })
              }
            }
          }
        }
      }
      if (Object.keys(this.state.subDocument).length !== 0) {
        subDocumentAttributes = []
        for (key in this.state.subDocument) {
          for (let i = 0; i < this.state.documentViewForm.attributes.length; i++) {
            if (key === this.state.documentViewForm.attributes[i].name) {
              subDocumentAttributes.push({
                name: this.state.documentViewForm.attributes[i].name,
                value: this.state.subDocument[key],
                type: this.state.documentViewForm.attributes[i].type,
              })
              console.log("PUSHED", this.state.documentViewForm.attributes[i].name, this.state.subDocument[key])
            }
          }
        }
        attributes.push({
          name: "Person",
          type: "Doc",
          docDef: this.state.documentViewForm.docDefId,
          "subDocument": {
            "attributes": subDocumentAttributes
          }
        })
      }
    }
    // console.log("ATTR", attributes)
    return attributes
  }
  getFieldValuesToSearch() {
    var attributes = []
    for (var key in this.state.fieldValue) {
      if (this.state.fieldValue[key] !== null && this.state.fieldValue[key] !== "") { //&& this.state.fieldValue[key] !== "NaN.NaN.NaN"
        if (key === "Country") {
          attributes.push({
            name: "Country",
            value: this.state.fieldValue[key],
            enumValueText: this.getAddressData(this.state.fieldValue[key]),
            type: "Text",
          })
        }
        else if (key === "Region") {
          attributes.push({
            name: "Region",
            value: this.state.fieldValue[key],
            enumValueText: this.getAddressData(this.state.fieldValue[key]),
            type: "Text",
          })
        }
        else if (key === "District") {
          attributes.push({
            name: "District",
            value: this.state.fieldValue[key],
            enumValueText: this.getAddressData(this.state.fieldValue[key]),
            type: "Text",
          })
        }
        else if (key === "subDistrict") {
          attributes.push({
            name: "subDistrict",
            value: this.state.fieldValue[key],
            enumValueText: this.getAddressData(this.state.fieldValue[key]),
            type: "Text",
          })
        }
        else if (key === "Village") {
          attributes.push({
            name: "Village",
            value: this.state.fieldValue[key],
            enumValueText: this.getAddressData(this.state.fieldValue[key]),
            type: "Text",
          })
        }
        else if (key === "ResidentialAddress") {
          attributes.push({
            name: "ResidentialAddress",
            value: this.state.fieldValue[key],
            type: "Text",
          })
        }
        else if (key === "Phone") {
          attributes.push({
            name: "Phone",
            value: this.state.fieldValue[key],
            type: "Text",
          })
        }
        else if (key === "PlaceOfLiving") {
          attributes.push({
            name: "PlaceOfLiving",
            value: this.state.fieldValue[key],
            type: "Enum",
          })
        }
        else if (key === "Person") {
          attributes.push({
            name: "Person",
            value: this.state.fieldValue[key],
            type: "Doc",
          })
        }

        else {
          for (var section = 0; section < this.state.Form.sections.length; section++) {
            for (var item = 0; item < this.state.Form.sections[section].contents.length; item++) {
              if (key === this.state.Form.sections[section].contents[item].name) {
                attributes.push({
                  name: this.state.Form.sections[section].contents[item].name,
                  value: this.state.fieldValue[key],
                  type: this.state.Form.sections[section].contents[item].type
                })
              }
            }
          }
        }
      }
    }
    if (Object.keys(this.state.subDocument).length !== 0) {
      var subDocumentAttributes = []
      for (key in this.state.subDocument) {
        if (this.state.subDocument[key] !== null && this.state.subDocument[key] !== "") { //&& this.state.subDocument[key] !== "NaN.NaN.NaN"
          for (let i = 0; i < this.state.documentViewForm.attributes.length; i++) {
            if (key === this.state.documentViewForm.attributes[i].name) {
              subDocumentAttributes.push({
                name: this.state.documentViewForm.attributes[i].name,
                value: this.state.subDocument[key],
                type: this.state.documentViewForm.attributes[i].type,
              })
              // console.log("PUSHED", this.state.documentViewForm.attributes[i].name, this.state.subDocument[key])
            }
          }
        }
      }
      attributes.push({
        name: "Person",
        type: "Doc",
        docDef: this.state.documentViewForm.docDefId,
        "subDocument": {
          "attributes": subDocumentAttributes
        }
      })
    }
    return attributes
  }
  checkForRequieredFields() {
    let checkedSuccessfuly = null
    let f = this.state.Form
    let fv = this.state.fieldValue
    let tt = this.state.taskType
    if (tt === "showRegForm" || tt === "showDetailedForm" || tt === "showChildRegForm" || tt === "showChildDetailedForm") {
      // if(this.state.fieldValue["RegNoAct"] !== "" && this.state.fieldValue["RegNoAct"] !== undefined){
      if (fv["Region"] !== null && fv["Region"] !== undefined) {
        checkedSuccessfuly = true
      }
      else {
        this.props.callErrorToast("Заполните поле \"Область\"")
        return false
      }
    }
    for (let s = 0; s < f.sections.length; s++) {
      if (f.sections[s].required === true) {
        for (let c = 0; c < f.sections[s].contents.length; c++) {
          let fieldName = f.sections[s].contents[c].name
          // console.log("CH1", fieldName, f.sections[s].contents[c].required)
          if (fv[fieldName] === undefined || fv[fieldName] === null || fv[fieldName] === "NaN.NaN.NaN" ||
            fv[fieldName] === "" || fv[fieldName] === "01.01.1970") {
            checkedSuccessfuly = false
          }
          else {
            checkedSuccessfuly = true
            break
            // return checkedSuccessfuly
          }
        }
        if (checkedSuccessfuly === false) {
          this.props.callErrorToast("Заполните одно из полей секции \"" + f.sections[s].label + "\"", "warning")
        }
      }
      else {
        for (let c = 0; c < f.sections[s].contents.length; c++) {
          let fieldName = f.sections[s].contents[c].name
          // console.log("CH2", fieldName, f.sections[s].contents[c].name)
          if (f.sections[s].contents[c].required === true) {
            if (fv[fieldName] === undefined || fv[fieldName] === null || fv[fieldName] === "NaN.NaN.NaN" || fv[fieldName] === "" ||
              fv[fieldName] === "" || fv[fieldName] === "01.01.1970") {
              checkedSuccessfuly = false
              this.props.callErrorToast("Внимание заполните поле \"" + f.sections[s].contents[c].label + "\"", "warning")
              // break
              return false
            }
            else {
              checkedSuccessfuly = true
            }
          }
          else {
            checkedSuccessfuly = true
          }
        }
      }
    }
    return checkedSuccessfuly
  }
  // Collect id of all documents that are in the local state
  getDocsIdToSign() {
    var docsId = []
    docsId.push(this.state.selectedDoc.id)
    if (this.state.docListIPR !== null) {
      for (var i = 0; i < this.state.docListIPR.length; i++) {
        docsId.push(this.state.docListIPR[i].id)
      }
    }
    return docsId
  }
  // Return person full age
  getPersonAge() {
    for (let i = 0; i < this.state.person.attributes.length; i++) {
      if (this.state.person.attributes[i].name === "Date_of_Birth") {
        let birthday = new Date(this.parseDate(this.state.person.attributes[i].value))
        let ageDifMs = Date.now() - birthday.getTime()
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        let fullAge = Math.abs(ageDate.getUTCFullYear() - 1970)
        console.log("AGE", fullAge)
        return fullAge
      }
    }
  }
  // Return label of select by it's id from fieldValue
  getEnumValueTextByValue(value) {
    for (let i = 0; i < this.state.enumData.length; i++) {
      for (let l = 0; l < this.state.enumData[i].data.length; l++) {
        if (this.state.enumData[i].data[l].Id === value) {
          return this.state.enumData[i].data[l].Text
        }
      }
    }
  }
  // Set new organization ID to all document in local state, prepare them to transfer to another Mse
  setOrgIdToMedakt() {
    let fstate = this.state
    let newDocList = []
    console.log("DOCLIST CUR", fstate.docList)
    if (fstate.docList !== null && fstate.docList !== "[]" && fstate.docList !== undefined) {
      for (let i = 0; i < fstate.docList.length; i++) {
        newDocList.push({ id: fstate.docList[i].id, attributes: [] })
        for (let l = 0; l < fstate.docList[i].attributes.length; l++) {
          if (fstate.docList[i].attributes[l].name === "MseName") {
            let newItem = {
              name: fstate.docList[i].attributes[l].name,
              type: fstate.docList[i].attributes[l].type,
              value: fstate.fieldValue["MseName"],
              enumValueText: this.getEnumValueTextByValue(this.state.fieldValue["MseName"]),
            }
            newDocList[i].attributes.push(newItem)
          }
          else {
            if (fstate.docList[i].attributes[l].name !== "State" && fstate.docList[i].attributes[l].value !== null) {
              let newItem = {
                name: fstate.docList[i].attributes[l].name,
                type: fstate.docList[i].attributes[l].type,
                value: fstate.docList[i].attributes[l].value
              }
              newDocList[i].attributes.push(newItem)
            }
          }
        }
      }
    }

    fstate.docList = newDocList
    let newDocListIPR = []
    if (fstate.docListIPR !== null && fstate.docListIPR !== "[]" && fstate.docListIPR !== undefined) {
      for (let i = 0; i < fstate.docListIPR.length; i++) {
        newDocListIPR.push({ id: fstate.docListIPR[i].id, attributes: [] })
        for (let l = 0; l < fstate.docListIPR[i].attributes.length; l++) {
          if (fstate.docListIPR[i].attributes[l].name !== "State" && fstate.docListIPR[i].attributes[l].value !== null) {
            let newItem = {
              value: fstate.docListIPR[i].attributes[l].value,
              name: fstate.docListIPR[i].attributes[l].name,
              type: fstate.docListIPR[i].attributes[l].type,
            }
            newDocListIPR[i].attributes.push(newItem)
          }
        }
      }
    }
    fstate.docListIPR = newDocListIPR
    this.setState(fstate)
    // console.log("DOCLIST", JSON.stringify(this.state.docList))
    // console.log("DOCLISTIPR", JSON.stringify(this.state.docListIPR))
  }
  // Main button click handler
  async buttonClick(name) {
    console.log("Butt", name)
    if (name === "createDocument") {
      let createDocument = { attributes: this.getFieldValues() }
      let commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "createDocument" },
          doc: { value: JSON.stringify(createDocument) },
          docDefId: { value: this.state.Form.docDefId },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole }
        }
      }
      console.log("button createDocument: ", commandJson)
      let checkResult = this.checkForRequieredFields()
      if (checkResult === true) {
        this.sendFieldValues(commandJson)
        this.clearTabData(this.state.process_id)
      }
    }
    else if (name === "updateDocument") {
      let updateDocument = { attributes: this.getFieldValues() }
      let filterIPR = {
        attributes: [
          {
            name: "AdultsMedicalCart",
            value: this.state.docId,
            type: "Doc"
          }
        ]
      }
      let commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "updateDocument" },
          doc: { value: JSON.stringify(updateDocument) },
          filterIPR: { value: JSON.stringify(filterIPR) },
          docDefId: { value: this.state.Form.docDefId },
          docId: { value: this.state.docId },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole }
        }
      }
      console.log("button updateDocument: ", commandJson)
      let checkResult = this.checkForRequieredFields()
      if (checkResult === true) {
        console.log("FV", this.state.fieldValue)
        this.sendFieldValues(commandJson)
        this.clearTabData(this.state.process_id)
      }
      // this.checkForEmptyFields(commandJson, 1)
      // this.sendFieldValues(commandJson)
    }
    else if (name === "findDocument") {
      let filterDocument = { attributes: this.getFieldValuesToSearch() }
      let commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        docDefId: this.state.Form.docDefId,
        variables: {
          userAction: { value: "findDocument" },
          doc: { value: JSON.stringify(filterDocument) },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole },
          size: { value: this.state.size },
          page: { value: 1 }
        }
      }
      console.log("button findDocument: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "findIPR") {
      let filterDocument = {
        attributes: [
          {
            name: "AdultsMedicalCart",
            type: "Doc",
            docDef: this.state.Form.medicalCardDocDefId,
            subDocument: { attributes: this.getFieldValuesToSearch() }
          }
        ]

      }
      let commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        docDefId: this.state.Form.docDefId,
        variables: {
          userAction: { value: "findDocument" },
          doc: { value: JSON.stringify(filterDocument) },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole },
          size: { value: this.state.size },
          page: { value: this.state.page }
        }
      }
      console.log("button findIPR: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "editDocument") {
      let editDocument = { attributes: this.getFieldValues() }
      let commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "editDocument" },
          doc: { value: JSON.stringify(editDocument) },
          docId: { value: this.state.docId },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole }
        }
      }
      console.log("button editDocument: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "reexamination") {
      let updateDocument = { attributes: this.getFieldValues() }
      let age = this.getPersonAge()
      let Adult = (age >= 18) ? "True" : "False"
      let commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "reexamination" },
          doc: { value: JSON.stringify(updateDocument) },
          docId: { value: this.state.docId },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole },
          adult: { value: Adult }
        }
      }
      console.log("button reexamination: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "medakt") {
      // let updateDocument = {attributes: this.getFieldValues()}
      let commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "medakt" },
          docId: { value: this.state.docId },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole }
        }
      }
      console.log("button Medakt: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "ipr") {
      // if (this.state.docListIPR !== null && this.state.docListIPR !== "null") {
      //   if (this.state.docListIPR.length > 0) {
      //     this.props.callErrorToast("Данный Медакт уже имеет ИПР")
      //   }
      // }
      if (this.state.docListIPR === null || this.state.docListIPR === "null" || this.state.docListIPR.length === 0) {
        let commandJson =
        {
          commandType: "completeTask",
          session_id: this.state.session_id,
          process_id: this.state.process_id,
          taskID: this.state.taskID,
          variables: {
            userAction: { value: "ipr" },
            docId: { value: this.state.docId },
            userId: { value: this.state.userId },
            userRole: { value: this.state.userRole }
          }
        }
        console.log("button IPR: ", commandJson)
        this.sendFieldValues(commandJson)
        this.clearTabData(this.state.process_id)
      }
      else {
        this.props.callErrorToast("Данный Медакт уже имеет ИПР!")
      }

    }
    else if (name === "deleteDocument") {
      swal({
        text: "Вы точно хотите удалить этот документ?",
        icon: "warning",
        buttons: { yes: "Да", no: "Нет" },
        dangerMode: true,
      })
        .then((click) => {
          if (click === "yes") {
            let commandJson =
            {
              commandType: "completeTask",
              session_id: this.state.session_id,
              process_id: this.state.process_id,
              taskID: this.state.taskID,
              variables: {
                userAction: { value: "deleteDocument" },
                docId: { value: this.state.docId },
                userId: { value: this.state.userId },
                userRole: { value: this.state.userRole }
              }
            }
            console.log("button deleteDocument: ", commandJson)
            this.sendFieldValues(commandJson)
            this.clearTabData(this.state.process_id)
          }
        })
    }
    else if (name === "signDocument") {
      let docsToSign = {
        docIdList: this.getDocsIdToSign(),
        stateTypeId: "32062CB7-C31C-4AFB-ADF3-F9F9AEEFCE59"
      }
      let commandJson =
      {
        commandType: "completeTask",
        process_id: this.state.process_id,
        session_id: this.state.session_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "signDocument" },
          doc: { value: JSON.stringify(docsToSign) }
          // doc: {
          //   value: {
          //     docIdList: this.getDocsIdToSign(),
          //     stateTypeId: "32062CB7-C31C-4AFB-ADF3-F9F9AEEFCE59"
          //   }
          // }
        }
      }
      console.log("button signDocument: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "registerDocument") {
      let docsToRegister = {
        docIdList: this.getDocsIdToSign(),
        stateTypeId: "C1414D0C-417A-45AB-8B57-01D30A567F08"
      }
      let commandJson =
      {
        commandType: "completeTask",
        process_id: this.state.process_id,
        session_id: this.state.session_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "registerDocument" },
          doc: { value: JSON.stringify(docsToRegister) }
        }
      }
      console.log("button registerDocument: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "showStatusSelectingForm") {

      let commandJson =
      {
        commandType: "completeTask",
        process_id: this.state.process_id,
        session_id: this.state.session_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "showStatusSelectingForm" },
          doc: {
            value: JSON.stringify({
              docIdList: this.getDocsIdToSign(),
              stateTypeId: ""
            })
          }
        }
      }
      console.log("button showStatusSelectingForm: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)

    }
    else if (name === "setNewState") {
      let checkResult = this.checkForRequieredFields()
      if (checkResult === true) {
        let states = {
          "29a5cf05-30de-45b9-8526-69de5ea8ab12": "a9e360f0-eed1-4ff6-9ab8-e4255c62ce4a", // умер
          "6a0f2699-eb53-4175-ac07-71deb84ae641": "10a96e4b-df5d-4f55-9d81-83f9e3e51de5", // приостановлена инвалидность
          "3d2dd30f-3ab0-439f-a8dd-149431af67be": "d203372c-236b-4b3e-953a-11f09a4aca61", // истекший срок инвалидности
          "b042e77b-9a12-47f1-a6d2-cc85e9029e61": "c9cfe461-e822-4f97-b34d-9312f8917fa9", // переехал за переделами рт
          "c5f3563c-688f-44f1-9c01-70d190ae9edb": "1fa96e5b-908f-4c57-bc4a-b61423951081", // перешел на возрастную пенсию
          "d5e1a3aa-dfb3-4c49-8360-c1278e70429f": "32062CB7-C31C-4AFB-ADF3-F9F9AEEFCE59", // вернуть в подписанные
          "83ade8bc-a070-4974-bea0-fe30e50422af": "C1414D0C-417A-45AB-8B57-01D30A567F08"  // зарегистрирован
        }
        // console.log("ST", this.state.fieldValue["StatesName"]);
        if (this.state.Form.docDefId === "5FDE415F-DB00-43B4-BA6E-FE439CFF6DA0" && this.state.fieldValue["StatusName"] === "1fa96e5b-908f-4c57-bc4a-b61423951081") {
          this.props.callErrorToast("Не допустимое значение для детского документа")
        }
        else {
          let stateBody = {
            "statusDate": this.parseDate(this.state.fieldValue.statusDate),//moment(new Date()).format("YYYY-MM-DD"),
            "docId": this.state.docId,
            "stateTypeId": states[this.state.fieldValue["StatusName"]]
          }
          let commandJson =
          {
            commandType: "completeTask",
            process_id: this.state.process_id,
            session_id: this.state.session_id,
            taskID: this.state.taskID,
            variables: {
              userAction: { value: "setNewState" },
              // newState: { value: states[this.state.fieldValue["StatusName"]] }
              stateBody: { value: JSON.stringify(stateBody) }
            }
          }
          console.log("button setNewState: ", commandJson)
          this.sendFieldValues(commandJson)
          this.clearTabData(this.state.process_id)
        }
      }
    }
    // else if (name === "setNewStateChild") {
    //   let states = {
    //     "adcb9640-51d0-4952-b196-27e87bb28d31": "10a96e4b-df5d-4f55-9d81-83f9e3e51de5", // приостановлена инвалидность 
    //     "a61fcb5d-e858-4183-b1cd-1fef00c6b4bc": "d203372c-236b-4b3e-953a-11f09a4aca61", // истекший срок инвалидности
    //     "184e3fac-a6b6-4c60-89a8-517862ecd9c4": "c9cfe461-e822-4f97-b34d-9312f8917fa9", // переехал за переделами рт          
    //     "05be1899-8d41-4dfd-ae72-41cba4aa9223": "a9e360f0-eed1-4ff6-9ab8-e4255c62ce4a", // умер
    //   }
    //   // console.log("ST", this.state.fieldValue["StatesName"]);
    //   let commandJson =
    //   {
    //     commandType: "completeTask",
    //     process_id: this.state.process_id,
    //     session_id: this.state.session_id,
    //     taskID: this.state.taskID,
    //     variables: {
    //       userAction: { value: "setNewStateChild" },
    //       newState: { value: states[this.state.fieldValue["StatesName"]] }
    //     }
    //   }
    //   console.log("button setNewStateChild: ", commandJson)
    //   this.sendFieldValues(commandJson)
    //   this.clearTabData(this.state.process_id)
    // }
    else if (name === "setStateDied") {
      let docsToSetState = {
        docIdList: this.getDocsIdToSign(),
        stateTypeId: "A9E360F0-EED1-4FF6-9AB8-E4255C62CE4A"
      }
      let commandJson =
      {
        commandType: "completeTask",
        process_id: this.state.process_id,
        session_id: this.state.session_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "setStateDied" },
          doc: { value: JSON.stringify(docsToSetState) }
          // doc: {
          //   value: {
          //     docIdList: this.getDocsIdToSign(),
          //     stateTypeId: "A9E360F0-EED1-4FF6-9AB8-E4255C62CE4A"
          //   }
          // }
        }
      }
      console.log("button setStateDied: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "backToMedakt") {
      let Document = {
        attributes: [
          {
            name: "AdultsMedicalCart",
            value: this.state.fieldValue["AdultsMedicalCart"],
            type: "Doc"
          }]
      }
      let commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "backToMedakt" },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole },
          docDefId: { value: this.state.Form.docDefId },
          doc: { value: JSON.stringify(Document) },
          docId: { value: this.state.fieldValue["AdultsMedicalCart"] },
          size: { value: 10 },
          page: { value: 1 }
        }
      }
      console.log("button backToMedakt: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "transferDocuments") {
      if (Object.keys(this.state.docList).length !== 0) {
        var age = this.getPersonAge()
        console.log("AGE", age)
        if (age >= 18) {
          var docDefId = this.state.Form.adultsMedaktDocDefId
        }
        else if (age < 18) {
          var docDefId = this.state.Form.childMedaktDocDefId
        }
        this.setOrgIdToMedakt()

        let commandJson =
        {
          commandType: "transferDocuments",
          session_id: this.state.session_id,
          process_id: this.state.process_id,
          taskID: this.state.taskID,
          medaktDocDefId: docDefId,
          IPRDocDefId: this.state.IPRGridForm.docDefId,
          medakts: JSON.stringify(this.state.docList),
          IPR: JSON.stringify(this.state.docListIPR),
          userId: this.state.userId,
          userRole: this.state.userRole
        }
        if (this.state.fieldValue["MseName"] !== null && this.state.fieldValue["MseName"] !== undefined) {
          console.log("button transfeDocuments: ", commandJson)
          this.sendFieldValues(commandJson)
          this.clearTabData(this.state.process_id)
        }
        else {
          this.props.callErrorToast("Выберите МСЭК для передачи данных")
        }
      }
      else this.props.callErrorToast("Нет данных для передачи")
    }
    else if (name === "downloadMemo") {
      this.downloadDocument("downloadPDF")
    }
    else if (name === "viewRegForm") {
      let commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "viewRegForm" },
          userId: { value: this.state.userId },
          size: { value: 10 },
          page: { value: 1 }
        }
      }
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "acceptComplaint") {
      let commandJson =
      {
        commandType: "completeTask",
        process_id: this.state.process_id,
        session_id: this.state.session_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "acceptComplaint" },
        }
      }
      console.log("button acceptComplaint: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "rejectComplaint") {
      let commandJson =
      {
        commandType: "completeTask",
        process_id: this.state.process_id,
        session_id: this.state.session_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "rejectComplaint" },
        }
      }
      console.log("button rejectComplaint: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "downloadMedakt") {
      let checkResult = this.checkForRequieredFields()
      if (checkResult === true) {
        this.props.callSuccessToast("Выгрузка начата дождитесь окончания процедуры!")
        let url = this.props.ismseApi + "/api/ExportDataToXlsx/ExportChildByStatus"
        let age = "(Детский)"
        if (this.state.taskType === "showDownloadAdultsMedaktForm") {
          url = this.props.ismseApi + "/api/ExportDataToXlsx/ExportGrownByStatus"
          age = "(Взрослый)"
        }
        let fv = this.state.fieldValue
        let body = {
          "state": this.state.selectedTransferList["cbd4b1f8-c225-48d6-997c-f2116f2d5122"],
          "startDate": this.parseDate(fv.startDate),
          "endDate": this.parseDate(fv.endDate)
        }
        if (fv.msecId !== null && fv.msecId !== undefined) {
          body.msecId = fv.msecId
        }
        if (fv.Region !== null && fv.Region !== undefined) {
          body.regionId = parseInt(fv.Region)
        }
        if (fv.District !== null && fv.District !== undefined) {
          body.districtId = parseInt(fv.District)
        }

        // console.log("BODY", body, fv)
        await fetch(url, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(body),
          // mode: 'no-cors'
        })
          .then(response => response.blob())
          .then(bl => {
            console.log("RES", bl)

            var docUrl = window.URL.createObjectURL(bl)
            var a = document.createElement('a')
            a.href = docUrl
            a.download = `Выгрузка Медактов ${age}.xls`
            document.body.appendChild(a)
            a.click()
            a.remove()
          })
          .catch(error => console.log('error', error))
      }
    }

    else if (name === "back") {
      let commandJson =
      {
        commandType: "completeTask",
        process_id: this.state.process_id,
        session_id: this.state.session_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "back" },
        }
      }
      console.log("button back: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "finish") {
      let commandJson =
      {
        commandType: "completeTask",
        process_id: this.state.process_id,
        session_id: this.state.session_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "finish" },
        }
      }
      console.log("button finish: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "cancel") {
      let commandJson =
      {
        commandType: "completeTask",
        process_id: this.state.process_id,
        session_id: this.state.session_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "cancel" },
        }
      }
      console.log("button cancel: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else {
      console.log("Unknown button", name)
    }
  }
  // Handler of amount of rows per page of grid form
  rowsPageChange(size, page) {
    console.log("Rows changed: ", size)
    let filterDocument = { attributes: this.getFieldValuesToSearch() }
    let commandJson =
    {
      commandType: "completeTask",
      session_id: this.state.session_id,
      process_id: this.state.process_id,
      taskID: this.state.taskID,
      docDefId: this.state.Form.docDefId,
      variables: {
        userAction: { value: "findDocument" },
        doc: { value: JSON.stringify(filterDocument) },
        size: { value: size },
        page: { value: page }
      }
    }
    console.log("JSON Collected: ", commandJson)
    this.sendFieldValues(commandJson)
    this.clearTabData(this.state.process_id)
  }
  // Returns Button component
  createButton(button, index) {
    if (button.name === "downloadExcel" || button.name === "downloadPDF") {
      return (
        <Button variant="outlined"
          name={button.name}
          onClick={() => this.downloadDocument(button.name)}
          value={button.name}
          style={{
            margin: 3,
            backgroundColor: button.backgroundColor,
            height: 32,
            fontSize: 12
          }}
        >
          {button.label}
        </Button>
      )
    }
    else if (button.name === "attachDocument") {
      return (
        <Button variant="outlined"
          name={button.name}
          onClick={() => this.showScanComponentClick()}
          value={button.name}
          style={{
            margin: 3,
            backgroundColor: button.backgroundColor,
            height: 32,
            fontSize: 12
          }}
        >
          {button.label}
        </Button>
      )
    }
    else if (button.name === "showStatusSelectingForm") {
      if (this.props.changeStatus === "true") {
        return (
          <Button variant="outlined"
            name={button.name}
            onClick={() => this.buttonClick(button.name)}
            style={{
              margin: 3,
              backgroundColor: button.backgroundColor,
              height: 32,
              fontSize: 12
            }}
            value={button.name}
          >
            {button.label}
          </Button>
        )
      }
    }
    else if (button.name === "signDocument") {
      if (this.props.signDocument === "true") {
        return (
          <Button variant="outlined"
            name={button.name}
            onClick={() => this.buttonClick(button.name)}
            style={{
              margin: 3,
              backgroundColor: button.backgroundColor,
              height: 32,
              fontSize: 12
            }}
            value={button.name}
          >
            {button.label}
          </Button>
        )
      }
    }
    else return (
      <Button variant="outlined"
        name={button.name}
        onClick={() => this.buttonClick(button.name)}
        style={{
          margin: 3,
          backgroundColor: button.backgroundColor,
          height: 32,
          fontSize: 12
        }}
        value={button.name}
      >
        {button.label}
      </Button>
    )
  }
  getEnumValueText(enumName) {
    for (let i = 0; i < this.state.selectedDoc.attributes.length; i++) {
      if (this.state.selectedDoc.attributes[i].name === enumName) {
        return this.state.selectedDoc.attributes[i].enumValueText
      }
    }
  }
  // Create sections with labels and call bodyBuilder function
  sectionBuilder(section, index) {
    return (
      <Table size="small" key={index + "table"}>
        <TableHead>
          <TableRow style={{ height: 30 }}>
            <TableCell
              key={index = "head"}
              style={{
                color: "black",
                fontSize: 14,
                backgroundColor: "#D3D3FE",
                width: "100%"
              }}>
              {section.label}
            </TableCell>
          </TableRow>
        </TableHead>
        {this.bodyBuilder(section)}
      </Table>
    )
  }
  // Create body of each section and call contentBuilder function
  bodyBuilder(section) {
    return (
      <Table size="small">
        <TableBody>
          {section.contents.map((contentItem, index) => (
            contentItem.type === "TransferList" ?
              <table size="small" align="center">
                <tr>
                  <th colSpan="3">{contentItem.label}</th>
                </tr>
                <tr>
                  <td width="43%" align="center" style={{ padding: "10px" }}>Не выбранные</td>
                  <td width="4%"></td>
                  <td width="43%" align="center" style={{ padding: "10px" }}>Выбранные</td>
                </tr>
                <tr>
                  <td width="43%">
                    <Grid item>{this.getTransferList(this.state.transferList[contentItem.enumDef], contentItem.enumDef, contentItem.edit)}</Grid>
                  </td>
                  <td width="4%">
                    <Grid item>
                      <Grid container direction="column">
                        <Button
                          variant="outlined"
                          size="small"
                          // className={classes.button}
                          onClick={() => this.handleAllRight(contentItem.enumDef)}
                        // disabled={this.state.transferList[contentItem.name].length === 0 ? true : false}
                        >
                          ≫
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          // className={classes.button}
                          onClick={() => this.handleCheckedRight(contentItem.enumDef)}
                        // disabled={this.state.leftChecked(contentItem.name).length === 0 ? true : false}
                        >
                          &gt;
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          // className={classes.button}
                          onClick={() => this.handleCheckedLeft(contentItem.enumDef)}
                        // disabled={this.state.rightChecked(contentItem.name).length === 0 ? true : false}
                        >
                          &lt;
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          // className={classes.button}
                          onClick={() => this.handleAllLeft(contentItem.enumDef)}
                        // disabled={selectedTransferList[contentItem.name].length === 0 ? true : false}
                        >
                          ≪
                        </Button>
                      </Grid>
                    </Grid>
                  </td>
                  <td width="43%">
                    <Grid item>{this.getTransferList(this.state.selectedTransferList[contentItem.enumDef], contentItem.enumDef, contentItem.edit)}</Grid>
                  </td>
                </tr>
              </table>
              :
              <Table size="small">
                <TableRow key={index} style={{ height: 30 }}>
                  {contentItem.name !== "PersonDetailFormAddress" && contentItem.name !== "PersonData" &&
                    contentItem.label !== "" &&
                    <TableCell
                      key={index + "cell1"}
                      align="left"
                      style={{ width: "40%" }}>
                      {contentItem.label}
                    </TableCell>
                  }
                  <TableCell
                    key={index + "cell2"}
                    align="left"
                    style={{ width: "60%", height: (this.state.Form.formName === "TransferMedicalCertificateForm") ? 100 : 30 }}
                  >{this.contentBuilder(contentItem)}
                  </TableCell>
                </TableRow>
              </Table>
          ))}
        </TableBody>
      </Table>
    )
  }
  // Create component by it's type
  contentBuilder(contentItem) {
    if (contentItem.type === "Text" || contentItem.type === "BLOB") {
      return (
        <TextField
          multiline
          // onChange={this.componentChange}
          // onBlur={this.handleChange}
          // defaultValue={(this.state.fieldValue[contentItem.name] !== undefined) ? this.state.fieldValue[contentItem.name] : ""}
          onChange={this.handleChange}
          value={(this.state.fieldValue[contentItem.name] !== undefined) ? this.state.fieldValue[contentItem.name] : ""}
          name={contentItem.name}
          style={{ width: "100%" }}
          disabled={(this.state.formType === "view" || contentItem.edit === false) ? true : false}
        />
      )
      // }
    }
    else if (contentItem.type === "Int") {
      return (
        <TextField
          disabled={(this.state.formType === "view" || contentItem.edit === false) ? true : false}
          style={{ width: "100%" }}
          // defaultValue = {(this.state.fieldValue[contentItem.name] !== undefined) ? this.state.fieldValue[contentItem.name]: ""}
          value={(this.state.fieldValue[contentItem.name] !== undefined) ? this.state.fieldValue[contentItem.name] : ""}
          onChange={this.componentIntChange}
          // onBlur={this.handleChange}
          name={contentItem.name}
          InputProps={{ inputComponent: NumberFormatCustom }}
        />
      )
    }
    else if (contentItem.type === "DateTime") {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <DatePicker
            clearable
            cancelLabel="Отмена"
            okLabel="Ок"
            clearLabel="Очистить"
            invalidDateMessage="неверный формат"
            name={contentItem.name}
            margin="small"
            format="dd.MM.yyyy"
            disabled={(this.state.formType === "view" || contentItem.edit === false) ? true : false}
            value={(this.state.fieldValue[contentItem.name] !== undefined) ? this.parseDate(this.state.fieldValue[contentItem.name]) : null}
            onChange={date => this.handleDateTimeChange(date, contentItem.name)}
          />
        </MuiPickersUtilsProvider>
      )
    }
    else if (contentItem.type === "Enum") {
      // console.log("EN DATA", this.state.enumData)
      let options = []
      options.push({
        "value": null,
        "label": null,
        "name": contentItem.name
      })
      for (let i = 0; i < this.state.enumData.length; i++) {
        if (contentItem.enumDef === this.state.enumData[i].enumDef) {
          for (let l = 0; l < this.state.enumData[i].data.length; l++) {
            options.push({
              "value": this.state.enumData[i].data[l].Id,
              "label": this.state.enumData[i].data[l].Text,
              "name": contentItem.name
            })
          }
          break
        }
      }
      // console.log("OPTOPNS", options)
      // console.log("S OPTOPNS", this.state.fieldValue[contentItem.name])
      var selectedOption = {}
      if (this.state.fieldValue[contentItem.name] !== undefined) {
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === this.state.fieldValue[contentItem.name]) {
            selectedOption = {
              "value": options[i].value,
              "name": options[i].name,
              "label": options[i].label
            }
            break
          }
          else selectedOption = {
            "value": null,
            "label": null,
            "name": contentItem.name
          }
        }
      }
      return (
        <Select
          name={contentItem.name}
          value={selectedOption}
          onChange={this.handleSelectChange}
          options={options}
          isDisabled={(this.state.formType === "view" || contentItem.edit === false) ? true : false}
          menuPortalTarget={document.body}
          styles={{ height: 30, width: "100%", menuPortal: base => ({ ...base, zIndex: 9999 })}}
        />
      )
    }
    else if (contentItem.type === "Currency" || contentItem.type === "Float") {
      return (
        <TextField
          value={this.state.fieldValue[contentItem.name] ? this.state.fieldValue[contentItem.name] : ""}
          // onChange = {this.componentChange}
          onBlur={this.handleChange}
          name={contentItem.name}
          style={{ width: "100%" }}
          disabled={(this.state.formType === "view" || contentItem.edit === false) ? true : false}
          InputProps={{ inputComponent: NumberFormatCustom }}
        />
      )
    }
    else if (contentItem.type === "Bool") {
      return (
        <Checkbox
          // key={this.getUUID()}
          style={{ maxWidth: 20, height: 15, color: (this.state.formType === "view" || contentItem.edit === false) ? "grey" : "green" }}
          name={contentItem.name}
          onChange={this.handCheckboxChange}
          disabled={(this.state.formType === "view" || contentItem.edit === false) ? true : false}
          checked={(this.state.fieldValue[contentItem.name] === "True" || this.state.fieldValue[contentItem.name] === true) ? true : false}
        />
      )
    }
    else if (contentItem.type === "PersonData") {
      return (
        <Person
          userId={this.state.userId}
          userRole={this.state.userRole}
          process_id={this.state.process_id}
          session_id={this.state.session_id}
          selectedDoc={this.state.person}
          documentViewForm={this.state.documentViewForm}
          taskID={this.state.taskID}
          subDocument={true}
          changeSubDocument={this.changeSubDocument}
          formType={this.state.personFormType}
          enumData={this.state.personEnumData}
          // formType = {this.state.formName === "AdultsIPRForm" ? "view" : "edit"}
          docList={null}
        >
        </Person>
      )
    }
    else if (contentItem.type === "Address") {
      return (
        <Address
          SOAT={this.state.SOAT}
          enumData={this.state.enumData}
          // countryChange = {this.countryChange}
          regionChange={this.regionChange}
          districtChange={this.districtChange}
          subDistrictChange={this.subDistrictChange}
          villageChange={this.villageChange}
          handleChange={this.handleChange}
          placeOfLivingChange={this.placeOfLivingChange}
          Country={this.state.fieldValue.Country}
          Region={this.state.fieldValue.Region}
          District={this.state.fieldValue.District}
          subDistrict={this.state.fieldValue.subDistrict}
          Village={this.state.fieldValue.Village}
          ResidentialAddress={this.state.fieldValue.ResidentialAddress}
          Phone={this.state.fieldValue.Phone}
          PlaceOfLiving={this.state.fieldValue.PlaceOfLiving}
          formType={this.state.formType}
          edit={contentItem.edit}
          formName={this.state.Form.formName}
        />
      )
    }
  }
  // custom allerts
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
  // Transfer List functions
  not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  leftChecked(enumDef) {
    return this.intersection(this.state.checked[enumDef], this.state.transferList[enumDef])
  }
  rightChecked(enumDef) {
    return this.intersection(this.state.checked[enumDef], this.state.selectedTransferList[enumDef])
  }
  handleToggle = (value, enumDef) => () => {
    const currentIndex = this.state.checked[enumDef].indexOf(value)
    const newChecked = this.state.checked
    // console.log("CHK", value, enumDef, currentIndex)
    if (currentIndex === -1) {
      newChecked[enumDef].push(value)
    }
    else {
      newChecked[enumDef].splice(currentIndex, 1)
    }
    this.setState({ checked: newChecked })
  }
  handleAllRight = (enumDef) => {
    let fstate = this.state
    fstate.selectedTransferList = { ...fstate.selectedTransferList, [enumDef]: fstate.selectedTransferList[enumDef].concat(fstate.transferList[enumDef]) }
    fstate.transferList = { ...fstate.transferList, [enumDef]: [] }
    this.setState(fstate)
  }
  handleCheckedRight(enumDef) {
    // console.log("CHECKED RIGHT", name)
    let fstate = this.state
    fstate.selectedTransferList = { ...fstate.selectedTransferList, [enumDef]: fstate.selectedTransferList[enumDef].concat(this.leftChecked(enumDef)) }
    fstate.transferList = { ...fstate.transferList, [enumDef]: this.not(fstate.transferList[enumDef], this.leftChecked(enumDef)) }
    fstate.checked = { ...fstate.checked, [enumDef]: this.not(fstate.checked[enumDef], this.leftChecked(enumDef)) }
    this.setState(fstate)
  }
  handleCheckedLeft(enumDef) {
    // console.log("CHECKED LEFT", enumDef, this.state.checked)
    let fstate = this.state
    fstate.transferList = { ...fstate.transferList, [enumDef]: fstate.transferList[enumDef].concat(this.rightChecked(enumDef)) }
    fstate.selectedTransferList = { ...fstate.selectedTransferList, [enumDef]: this.not(fstate.selectedTransferList[enumDef], this.rightChecked(enumDef)) }
    fstate.checked = { ...fstate.checked, [enumDef]: this.not(fstate.checked[enumDef], this.rightChecked(enumDef)) }
    this.setState(fstate)
  }
  handleAllLeft = (enumDef) => {
    let fstate = this.state
    fstate.transferList = { ...fstate.transferList, [enumDef]: fstate.transferList[enumDef].concat(fstate.selectedTransferList[enumDef]) }
    fstate.selectedTransferList = { ...fstate.selectedTransferList, [enumDef]: [] }
    this.setState(fstate)
  }
  getTransferList(items, enumDef, edit) {
    // console.log("G TR L", items, enumDef)
    return (
      <Paper style={{ width: "100%", height: 200, overflow: 'auto', }}>
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;
            return (
              <ListItem
                size="small"
                key={value}
                role="listitem"
                button
                onClick={this.handleToggle(value, enumDef)}
                style={{ height: 40 }}
              >
                <Checkbox
                  size="small"
                  checked={this.state.checked[enumDef].indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  style={{ height: 40 }}
                />
                {/* <ListItemText id={labelId} primary={value} /> */}
                <ListItemText id={labelId} primary={this.getTranserListItemLabel(enumDef, value)} />
              </ListItem>
            )
          })}
          <ListItem />
        </List>
      </Paper>
    )
  }
  getTranserListItemLabel(enumDef, value) {
    // console.log("G TRL LABEL", enumDef, value)
    for (let e = 0; e < this.state.enumData.length; e++) {
      if (this.state.enumData[e].enumDef === enumDef) {
        for (let d = 0; d < this.state.enumData[e].data.length; d++) {
          if (this.state.enumData[e].data[d].Id === value) {
            // console.log("TRL LABEL", enumDef, value, this.state.enumData[e].data[d].Text)
            return this.state.enumData[e].data[d].Text
          }
        }
      }
    }
  }
  render() {
    try {
      // if (!this.state.Form) return <div>No Form</div>
      // if (this.state.buttons === undefined) return <div>No Buttons</div>
      // console.log("ViewForm State", this.state)
      // console.log("ViewForm Props", this.props)
      return (
        <Grid>
          {this.state.Form !== null &&
            <Grid container direction="row" justify="flex-start" spacing={1}>
              <Grid item xs={10}>
                <Paper>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <TableHead>
                      <TableRow style={{ maxHeight: 25 }}>
                        <TableCell style={{ fontSize: 16, color: "black" }}>{this.state.Form.label}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Grid>
                  <Grid container direction="row" justify="center" alignItems="center">
                    {this.state.Form.sections.map((section, index) => {
                      return this.sectionBuilder(section, index)
                    })}
                  </Grid>
                  <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    {this.state.buttons.map((button, index) => {
                      return this.createButton(button, index)
                    })}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          }
          <br></br>

          {this.state.docList !== null && this.state.docList !== "null" &&
            this.state.docList !== undefined ?
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
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
                Form={this.state.gridForm}
                gridFormButtons={this.state.gridFormButtons}
                rowsPageChange={this.rowsPageChange}
                sendFieldValues={this.sendFieldValues}
                SOAT={this.state.SOAT}
                handleCloseCurrentTab={this.handleCloseCurrentTab}
                clearTabData={this.clearTabData}
                callSuccessToast={this.props.callSuccessToast}
                callErrorToast={this.props.callErrorToast}
              >
              </GridForm>
            </Grid>
            :
            <br></br>
          }
          {this.state.docListIPR !== null && this.state.docListIPR !== "null" &&
            this.state.docListIPR !== undefined ?
            <GridForm
              key="grid form"
              process_id={this.state.process_id}
              session_id={this.state.session_id}
              taskID={this.state.taskID}
              userId={this.state.userId}
              organizationId={this.state.organizationId}
              userRole={this.state.userRole}
              docListIPR={this.state.docListIPR}
              size={this.state.size}
              page={this.state.page}
              Form={this.state.IPRGridForm} // {this.state.gridForm.Form}
              medicalCardId={this.state.docId}
              gridFormButtons={this.state.gridFormButtons}
              rowsPageChange={this.rowsPageChange}
              sendFieldValues={this.sendFieldValues}
              SOAT={this.state.SOAT}
              handleCloseCurrentTab={this.handleCloseCurrentTab}
              clearTabData={this.clearTabData}
              callSuccessToast={this.props.callSuccessToast}
              callErrorToast={this.props.callErrorToast}
            >
            </GridForm>
            :
            <br></br>
          }
          <br></br>
          {this.state.download === "downloadExcel" &&
            <Download
              downloadType={this.state.download}
              Form={this.state.Form}
              fieldValue={this.state.fieldValue}
              person={this.state.person}
              SOAT={this.state.SOAT}
              selectedDoc={this.state.selectedDoc}

            />
          }
          {this.state.download === "downloadPDF" &&
            <Grid container direction="row" justify="flex-start" spacing={1} id="TableToDownload">
              <Grid item xs={12}>
                <Card>
                  <Download
                    downloadType={this.state.download}
                    Form={this.state.Form}
                    fieldValue={this.state.fieldValue}
                    person={this.state.person}
                    SOAT={this.state.SOAT}
                    selectedDoc={this.state.selectedDoc}
                    enumData={this.state.enumData}
                  />
                </Card>
              </Grid>
            </Grid>
          }
        </Grid>
      )
    }
    catch (error) {
      console.log("ERROR", error)
      return <div>error</div>
    }
  }
}
export default MainForm