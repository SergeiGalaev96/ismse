import React from "react";
// @material-ui/core components
// import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
// import TextField from "@material-ui/core";
// import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
// import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import swal from 'sweetalert' // https://sweetalert.js.org/guides/
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Table } from 'reactstrap';
import TableToExcel from "@linways/table-to-excel"; // https://github.com/linways/table-to-excel
import Tooltip from '@material-ui/core/Tooltip';
// import { SnackbarProvider, useSnackbar } from 'notistack';
import Snackbar from '@material-ui/core/Snackbar';

class GridForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gridFormData: null,
      docListIPR: null,
      fieldValue: {},
      process_id: null,
      session_id: null,
      organizationId: null,
      buttons: null,
      gridFormButtons: null,
      taskID: null,
      userId: null,
      userRole: null,
      Form: null,
      SOAT: null,
      page: 1,
      size: 10,
      tableUniqueId: null,
      showSnackBar: false,
      snackBarMessage: ""
    }
    this.buttonClick = this.buttonClick.bind(this)
    this.sendFieldValues = this.sendFieldValues.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.KeyboardArrowRightClick = this.KeyboardArrowRightClick.bind(this)
    this.setDataFromProps = this.setDataFromProps.bind(this)
    this.handleCloseCurrentTab = this.handleCloseCurrentTab.bind(this)
    this.clearTabData = this.clearTabData.bind(this)
  }
  sendFieldValues(commandJson) {
    this.props.sendFieldValues(commandJson)
  }
  clearTabData(process_id) {
    this.props.clearTabData(process_id)
  }
  async componentDidMount() {
    if (this.state.process_id === null) {
      console.log("GridForm PROPS", this.props)
      this.setDataFromProps()
    }
  }
  async componentDidUpdate() {
    if (this.state.process_id === null) {
      this.setDataFromProps()
    }
  }
  // Set data from props to local state
  async setDataFromProps() {
    let fstate = this.state

    if (this.props.docList !== undefined && this.props.docList !== "[]" && this.props.docList !== null) {
      let docList = this.props.docList
      fstate.gridFormData = docList
    }
    if (this.props.docListIPR !== undefined && this.props.docListIPR !== "[]" && this.props.docListIPR !== null) {
      let docListIPR = this.props.docListIPR
      fstate.gridFormData = docListIPR
      // fstate.size = docListIPR.length
    }
    if (this.props.page !== undefined && this.props.page !== "null") {
      fstate.page = parseInt(this.props.page)
    }
    if (this.props.size !== undefined && this.props.size !== "null") {
      fstate.size = parseInt(this.props.size)
    }

    if (this.props.gridFormButtons !== undefined && this.props.gridFormButtons !== null) {
      fstate.gridFormButtons = this.props.gridFormButtons
    }
    if (this.props.SOAT !== undefined) {
      fstate.SOAT = this.props.SOAT
    }
    fstate.tableUniqueId = this.getUUID()
    fstate.taskID = this.props.taskID
    fstate.session_id = this.props.session_id
    fstate.process_id = this.props.process_id
    fstate.organizationId = this.props.organizationId
    fstate.Form = this.props.Form

    fstate.userId = this.props.userId
    fstate.userRole = this.props.userRole
    this.setState(fstate)
  }
  getUUID() {
    const uuidv1 = require("uuid/v1")
    return uuidv1()
  }

  handleCloseCurrentTab(process_id) {
    this.props.handleCloseCurrentTab(process_id)
  }
  // getDate(date){
  //   var newDate = new Date(date)
  //   var dd = String(newDate.getDate()).padStart(2, '0')
  //   var mm = String(newDate.getMonth() + 1).padStart(2, '0') //January is 0!
  //   var yyyy = newDate.getFullYear()
  //   var convertedDate = dd + '-' + mm + '-' + yyyy
  //   return convertedDate
  // }
  // Find and return id of person document
  getPersonId(dataItem) {
    if (this.state.Form.formName === "IPRGridForm") {
      for (let i = 0; i < dataItem.attributes.length; i++) {
        if (dataItem.attributes[i].name === "AdultsMedicalCart") {
          for (let l = 0; l < dataItem.attributes[i].subDocument.attributes.length; l++) {
            if (dataItem.attributes[i].subDocument.attributes[l].name === "Person") {
              return (dataItem.attributes[i].subDocument.attributes[l].value)
            }
          }
        }
      }
    }
    else {
      for (let i = 0; i < dataItem.attributes.length; i++) {
        if (dataItem.attributes[i].name === "Person") {
          return (dataItem.attributes[i].value)
        }
      }
    }
  }
  // Date parser for function getPersonAge
  parseDate(date) {
    if (date !== undefined) {
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
    return convertedDate
  }
  // Function returns full age of person by its birthday
  getPersonAge(dataItem) {
    for (var i = 0; i < dataItem.attributes.length; i++) {
      if (dataItem.attributes[i].name === "Date_of_Birth") {
        var birthday = new Date(this.parseDate(dataItem.attributes[i].value))
        // console.log("birthday" , birthday)
        var ageDifMs = Date.now() - birthday.getTime()
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var fullAge = Math.abs(ageDate.getUTCFullYear() - 1970)
        // console.log("AGE" , fullAge)
        return fullAge
      }
    }
  }
  // Function returns existaed state of selected document
  getCurrentDocumentState(dataItem) {
    for (var i = 0; i < dataItem.attributes.length; i++) {
      if (dataItem.attributes[i].name === "State") {
        var docState = dataItem.attributes[i].value
        return docState
      }
    }
  }
  handleCloseSnackBar() {
    this.setState({ showSnackBar: false })
  }
  // Handler of buttons click inside the grid form
  buttonClick = (name, dataItem) => {
    if (name === "deleteIPR") {
      // console.log("DATA", dataItem)
      for (let i = 0; i < dataItem.attributes.length; i++) {
        if (dataItem.attributes[i].name === "AdultsMedicalCart") {
          const filterDocument = {
            attributes: [
              {
                name: "AdultsMedicalCart",
                value: dataItem.attributes[i].value,
                type: "Doc"
              }
            ]
          }
          const commandJson =
          {
            commandType: "completeTask",
            session_id: this.state.session_id,
            process_id: this.state.process_id,
            taskID: this.state.taskID,
            variables: {
              userAction: { value: "deleteIPR" },
              userId: { value: this.state.userId },
              userRole: { value: this.state.userRole },
              docDefId: { value: this.state.Form.docDefId },
              doc: { value: JSON.stringify(filterDocument) },
              medicalCardId: { value: this.props.medicalCardId },
              docId: { value: dataItem.id },
              size: { value: 10 },
              page: { value: 1 }
            }
          }
          swal({
            text: "Вы точно хотите удалить этот ИПР",
            icon: "warning",
            buttons: { yes: "Да", no: "Нет" },
            dangerMode: true,
          })
            .then((click) => {
              if (click === "yes") {
                for (let k = 0; k < dataItem.attributes.length; k++) {
                  if (dataItem.attributes[k].name === "State") {
                    if (dataItem.attributes[k].value === "Утвержден (подписан)") {
                      swal({
                        text: "Вы не можете удалять подписанные документы",
                        icon: "warning",
                        buttons: { ok: "Ок" },
                        // dangerMode: true,
                      })
                    } else {
                      console.log("button deleteIPR: ", commandJson)
                      this.sendFieldValues(commandJson)
                    }
                  }
                }
              } else {
                console.log("CLICK", click)
              }
            })
        }
      }
    }
    else if (name === "openMedakt") {
      const filterDocument = {
        attributes: [
          {
            name: "AdultsMedicalCart",
            value: dataItem.id,
            type: "Doc"
          }
        ]
      }
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: "openMedakt" },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole },
          // docDefId:{value: this.state.Form.docDefId},
          doc: { value: JSON.stringify(filterDocument) },
          medicalCardId: { value: this.props.medicalCardId },
          personId: { value: this.getPersonId(dataItem) },
          docId: { value: dataItem.id },
          size: { value: 10 },
          page: { value: 1 }
        }
      }
      console.log("button openMedakt: ", commandJson)
      this.sendFieldValues(commandJson)
    }
    else if (name === "editIPR") {
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: name },
          docId: { value: dataItem.id },
          docDefId: { value: this.state.Form.docDefId },
          personId: { value: this.getPersonId(dataItem) },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole }
        }
      }
      console.log("button editIPR: ", commandJson)
      this.sendFieldValues(commandJson)
    }
    else if (name === "selectDocumentToTransfer") {
      let medakt = {
        attributes: [
          // {
          //   name: "MseName",
          //   type: "Enum",
          //   value: this.state.organizationId
          // },
          {
            name: "Person",
            type: "Doc",
            value: dataItem.id
          }
        ]
      }
      let age = this.getPersonAge(dataItem)
      let docDefId = age >= 18 ? this.state.Form.adultsMedaktDocDefId : this.state.Form.childMedaktDocDefId
      let IPR = {
        attributes: [
          {
            name: "AdultsMedicalCart",
            type: "Doc",
            docDef: docDefId,
            subDocument: {
              attributes: [
                // {
                //   name: "MseName",
                //   type: "Enum",
                //   value: this.state.organizationId
                // },
                {
                  name: "Person",
                  type: "Doc",
                  value: dataItem.id
                }
              ]
            }
          }
        ]
      }
      if (this.state.userRole !== "Администратор") {
        medakt.attributes.push(
          {
            name: "MseName",
            type: "Enum",
            value: this.state.organizationId
          }
        )
        IPR.attributes[0].subDocument.attributes.push(
          {
            name: "MseName",
            type: "Enum",
            value: this.state.organizationId
          }
        )
      }
      let commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: name },
          medakt: { value: JSON.stringify(medakt) },
          medaktDefId: { value: docDefId },
          IPR: { value: JSON.stringify(IPR) },
          userId: { value: this.state.userId },
        }
      }
      console.log("button selectDocumentToTransfer: ", commandJson)
      this.sendFieldValues(commandJson)
    }
    else if (name === "selectDocument") {
      let age = this.getPersonAge(dataItem)
      let docDefId = (age >= 18) ? this.state.Form.adultsMedaktDocDefId : this.state.Form.childMedaktDocDefId
      let adult = (age >= 18) ? "True" : "False"
      let existedState = this.getCurrentDocumentState(dataItem)
      let curDocState = "False"
      if (existedState === "Утвержден" || existedState === "Отказан") {
        curDocState = "True"
      }
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: name },
          adult: { value: adult },
          docDefId: { value: docDefId },
          userId: { value: this.state.userId },
          docId: { value: dataItem.id },
          docStateDefined: { value: curDocState }
        }
      }
      console.log("button selectDocument: ", commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
    else if (name === "deleteDocument") {
      for (let k = 0; k < dataItem.attributes.length; k++) {
        if (dataItem.attributes[k].name === "State") {
          // if (dataItem.attributes[k].value === "Утвержден (подписан)") {
          //   this.props.callErrorToast("Вы не можете удалять подписанные документы!")
          // }
          // else {
          swal({
            text: "Вы точно хотите удалить этот документ?",
            icon: "warning",
            buttons: { yes: "Да", no: "Нет" },
            dangerMode: true,
          })
            .then((click) => {
              if (click === "yes") {
                const commandJson =
                {
                  commandType: "completeTask",
                  session_id: this.state.session_id,
                  process_id: this.state.process_id,
                  taskID: this.state.taskID,
                  variables: {
                    userAction: { value: name },
                    docId: { value: dataItem.id },
                    personId: { value: this.getPersonId(dataItem) },
                    userId: { value: this.state.userId },
                    userRole: { value: this.state.userRole }
                  }
                }
                this.sendFieldValues(commandJson)
                this.clearTabData(this.state.process_id)
                console.log("button deleteDocument: ", commandJson)
              }
            })
          // }
        }
      }
    }
    else {
      const commandJson =
      {
        commandType: "completeTask",
        session_id: this.state.session_id,
        process_id: this.state.process_id,
        taskID: this.state.taskID,
        variables: {
          userAction: { value: name },
          docId: { value: dataItem.id },
          personId: { value: this.getPersonId(dataItem) },
          userId: { value: this.state.userId },
          userRole: { value: this.state.userRole }
        }
      }
      console.log("button ", name, commandJson)
      this.sendFieldValues(commandJson)
      this.clearTabData(this.state.process_id)
    }
  }
  // simple component change handler
  handleChange = (event) => {
    let newValue = parseInt(event.target.value)
    this.setState({ page: newValue })
  }
  // Handle prev page button click
  KeyboardArrowLeftClick(page) {
    if (page !== 1 && this.state.page !== 1) {
      var prevPage = page - 1
      this.setState({ page: prevPage })
      this.props.rowsPageChange(this.state.size, prevPage)
      console.log("Page changed: ", prevPage)
    }
    else {
      this.setState({ snackBarMessage: "Вы на первой странице!" })
      this.setState({ showSnackBar: true })
    }
  }
  // Handle next page button click
  KeyboardArrowRightClick(page) {
    if (this.state.gridFormData.length < this.state.size) {
      this.setState({ snackBarMessage: "Других записей нет!" })
      this.setState({ showSnackBar: true })
    }
    else {
      var nextPage = page + 1
      this.setState({ page: nextPage })
      this.props.rowsPageChange(this.state.size, nextPage)
      console.log("Page changed: ", nextPage)
    }

  }
  GoToPage() {
    this.props.rowsPageChange(this.state.size, this.state.page)
  }
  // Handler of amount of rows per page
  handleChangeRowsPerPage = (event) => {
    if (this.state.gridFormData.length < this.state.size && event.target.value > this.state.gridFormData.length) {
      this.setState({ snackBarMessage: "Других записей нет!" })
      this.setState({ showSnackBar: true })
    }
    else {
      this.setState({ size: event.target.value })
      this.props.rowsPageChange(event.target.value, this.state.page)
      // console.log("Rows amount changed: ", event.target.value)
    }
  }
  // Get name of address by its code
  getAddressData(code, name) {
    // console.log("CODE", code)
    for (var i = 0; i < this.state.SOAT.countries.length; i++) {
      if (code === this.state.SOAT.countries[i].code && name === "Country") {
        return this.state.SOAT.countries[i].name
      }
      else {
        for (var j = 0; j < this.state.SOAT.countries[i].regions.length; j++) {
          if (code === this.state.SOAT.countries[i].regions[j].code && name === "Region") {
            return this.state.SOAT.countries[i].regions[j].name
          }
          else {
            for (var k = 0; k < this.state.SOAT.countries[i].regions[j].districts.length; k++) {
              if (code === this.state.SOAT.countries[i].regions[j].districts[k].code && name === "District") {
                return this.state.SOAT.countries[i].regions[j].districts[k].name
              }
              else {
                if (this.state.SOAT.countries[i].regions[j].districts[k].subDistricts !== undefined) {
                  for (var l = 0; l < this.state.SOAT.countries[i].regions[j].districts[k].subDistricts.length; l++) {
                    if (code === this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].code && name === "subDistrict") {
                      return this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].name
                    }
                    else {
                      if (this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].villages !== undefined) {
                        for (var m = 0; m < this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].villages.length; m++) {
                          if (code === this.state.SOAT.countries[i].regions[j].districts[k].subDistricts[l].villages[m].code && name === "Village") {
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
  // Return value by type of component
  getGridFormItems(item) {
    if (item.name === "Region" || item.name === "District"
      || item.name === "subDistrict" || item.name === "Village") {
      return this.getAddressData(item.value, item.name)
      // return item.enumValueText
    }
    else {
      if (item.type === "Enum") {
        return item.enumValueText
      }
      else if (item.type === "DateTime") {
        return item.value.substring(0, 10)
      }
      // else if (item.type === "DateTime") {
      //   // Convert date to appropriate format
      //   if (item !== undefined) {
      //     var dd = item.value.substring(0, 2)
      //     var mm = item.value.substring(3, 5)
      //     var yyyy = item.value.substring(6, 10)
      //     var convertedDate = String(yyyy + '-' + mm + '-' + dd)
      //     var newDate = new Date(convertedDate) // "2017-01-26"
      //     dd = String(newDate.getDate()).padStart(2, '0')
      //     mm = String(newDate.getMonth() + 1).padStart(2, '0') //January is 0!
      //     yyyy = newDate.getFullYear()
      //     convertedDate = dd + '-' + mm + '-' + yyyy
      //     return convertedDate
      //   }
      // }
      else if (item.type === "Bool") {
        return (
          <Checkbox
            style={{ maxWidth: 20, height: 15, color: "grey" }}
            name={item.name}
            disabled={true}
            checked={item.value === "True" ? true : false}
          />)
      }
      else {
        return item.value
      }
    }

  }
  downloadExcel() {
    TableToExcel.convert(document.getElementById(this.state.tableUniqueId))
  }
  // Define colums width to download grid form into ecel
  getColsWidth() {
    let iprGridFormColsWidth = "20, 15, 16, 30, 15, 15, 17, 17, 16, 19, 19, 19, 14, 16, 16, 13, 18, 18, 18, 15, 15, 15, 15, 20, 25, 20, 18, 15, 15, 15, 15, 15"
    let registrationGridFormColsWidth = "20, 15, 16, 30, 15, 15, 17, 17, 16, 19, 19, 19, 14, 16, 13, 18"
    let medaktGridFormColsWidth = "20, 15, 16, 30, 15, 15, 15, 17, 17, 16, 19, 19, 19, 14, 16, 13, 18, 18, 18, 15"
    let complaintsGridFormColsWidth = "20, 16, 16, 16, 17, 13, 13, 13, 19, 25"
    let appealsGridFormColsWidth = "20, 16, 16, 16, 17, 13, 13, 13, 19, 25, 25"
    if (this.state.Form.formName === "IPRGridForm") {
      return iprGridFormColsWidth
    }
    else if (this.state.Form.formName === "adultsRegistrationGridForm") {
      return registrationGridFormColsWidth
    }
    else if (this.state.Form.formName === "complaintsGridForm") {
      return complaintsGridFormColsWidth
    }
    else if (this.state.Form.formName === "appealsGridForm") {
      return appealsGridFormColsWidth
    }
    else {
      return medaktGridFormColsWidth
    }
  }
  render() {
    try {
      if (!this.state.userId) return <LinearProgress />
      else if (!this.state.session_id) return <LinearProgress />
      else if (!this.state.process_id) return <LinearProgress />
      else if (!this.state.taskID) return <LinearProgress />
      return (
        <Grid container direction="row" justify="flex-start" spacing={0}>
          <Grid item sm={"auto"}>
            <Card>
              <Paper>
                {this.state.Form.formName === "documentViewForm" ?
                  <Table
                    data-cols-width="15, 11, 11, 11, 15, 15, 15, 15, 12, 22, 32, 7, 10, 25, 13"
                    bordered
                    id={this.state.tableUniqueId}
                    size="small">
                    <TableHead style={{ backgroundColor: "#D3D3FE" }}>
                      <tr>
                        <TableCell data-exclude="true" key="action" style={{ color: "black", fontSize: 12 }}>Действие</TableCell>
                        {this.state.Form.attributes.map((attribute, index) =>
                          <TableCell data-b-a-s="thin" data-f-bold="true" style={{ color: "black", fontSize: 13 }}>{attribute.caption}</TableCell>
                        )}
                      </tr>
                    </TableHead>
                    <TableBody>
                      {this.state.gridFormData.map((dataItem, index) => (
                        <TableRow style={{ height: 30 }}>
                          <TableCell data-exclude="true" style={{ maxWidth: 50 }}>
                            {this.state.gridFormButtons.map((button, index) =>
                              <Button
                                variant="outlined"
                                onClick={() => this.buttonClick(button.name, dataItem)}
                                style={{
                                  margin: 1,
                                  height: 24,
                                  fontSize: 9,
                                  maxWidth: 32,
                                  backgroundColor: button.backgroundColor
                                }}
                              >{button.label}
                              </Button>
                            )}
                          </TableCell>
                          {this.state.Form.attributes.map((formAttribute, index) =>
                            dataItem.attributes.map((dataItemAttr, index) => {
                              if (dataItemAttr.name === formAttribute.name) {
                                if (dataItemAttr.value === null)
                                  return (
                                    <TableCell align="left">-</TableCell>
                                  )
                                else return (
                                  <TableCell align="left" style={{ whiteSpace: "nowrap", textOverflow: "hidden" }}>
                                    {this.getGridFormItems(dataItemAttr)}
                                    {/* {dataItemAttr.type === "Enum" ? dataItemAttr.enumValueText : dataItemAttr.value} */}
                                  </TableCell>
                                )
                              }
                              else return null
                            })
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  :
                  <Table
                    data-cols-width={this.getColsWidth()}
                    // Статус	№ регистрации	№ акта по МСЭК	Наименование МСЭ	Инвалидность установлена с	Инвалидность установлена по	
                    // Дата регистрации	Фамилия	Имя	Отчество	ПИН	Дата рождения	Пол	Область	Район/город	Джаомат	Село	Дом/кв/ул	Телефон
                    bordered
                    id={this.state.tableUniqueId}
                    size="small">
                    <TableHead style={{ backgroundColor: "#D3D3FE" }}>
                      <tr>
                        <td data-exclude="true"></td>
                        {this.state.Form.sections.map((section, index) => {
                          // Build 1rst row of header
                          return (
                            <td data-b-a-s="thin" data-f-bold="true" colSpan={section.contents.length} key={index} style={{ color: "black", fontSize: 13 }}>{section.label}</td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td data-exclude="true" key="action" style={{ color: "black", fontSize: 14, minWidth: 50 }}>Действие</td>
                        {this.state.Form.sections.map(section =>
                          section.contents.map((contentItem, index) => {
                            // Build 2nd row of header
                            return (
                              <td data-f-bold="true" data-a-wrap="true" data-b-a-s="thin" data-a-h="justify" data-a-v="justify" key={index} style={{ color: "black", fontSize: 13 }}>{contentItem.label}</td>
                            )
                          })
                        )}
                      </tr>
                    </TableHead>
                    <TableBody>
                      {this.state.gridFormData.map((dataItem, index) => (
                        <tr style={{ height: 30 }}>
                          <td data-exclude="true" style={{ maxWidth: 50 }}>
                            {this.state.gridFormButtons !== null &&
                              this.state.gridFormButtons.map((button, index) =>
                                <Button
                                  variant="outlined"
                                  onClick={() => this.buttonClick(button.name, dataItem)}
                                  style={{
                                    margin: 1,
                                    height: 24,
                                    fontSize: 9,
                                    maxWidth: 32,
                                    backgroundColor: button.backgroundColor
                                  }}
                                >{button.label}
                                </Button>
                              )}
                          </td>
                          {this.state.Form.sections.map(section => {
                            if (this.state.Form.formName === "IPRGridForm") {
                              if (section.name === "PersonData") {
                                // console.log("DataItem", dataItem)
                                return (
                                  section.contents.map(contentItem => {
                                    return (
                                      dataItem.attributes.map(dataItemAttr => {
                                        if (dataItemAttr.name === "AdultsMedicalCart") {
                                          return (
                                            dataItemAttr.subDocument.attributes.map(medaktDataItemAttr => {
                                              if (medaktDataItemAttr.name === "Person") {
                                                return (
                                                  medaktDataItemAttr.subDocument.attributes.map((personDataItemAttr, index) => {
                                                    if (personDataItemAttr.name === contentItem.name) {
                                                      if (personDataItemAttr.value === null || personDataItemAttr.value === "") {
                                                        // console.log("Name", personDataItemAttr.name, "Value", personDataItemAttr.value)
                                                        return (
                                                          <td align="left" style={{ color: "black", fontSize: 12 }}>-</td>
                                                        )
                                                      }
                                                      else {
                                                        return (
                                                          <td align="left" style={{ color: "black", fontSize: 12, whiteSpace: "nowrap", textOverflow: "hidden" }}>
                                                            {this.getGridFormItems(personDataItemAttr)}
                                                          </td>
                                                        )
                                                      }
                                                    }
                                                  })
                                                )
                                              }
                                            })
                                          )
                                        }
                                      })
                                    )
                                  })
                                )
                              }
                              else if (section.name === "MedaktData") {
                                // console.log("MedaktData section")
                                return (
                                  section.contents.map(contentItem => {
                                    return (
                                      dataItem.attributes.map(dataItemAttr => {
                                        if (dataItemAttr.name === "AdultsMedicalCart") {
                                          // console.log("AdultsMedicalCart", dataItemAttr)
                                          return (
                                            dataItemAttr.subDocument.attributes.map((medaktDataItem, index) => {
                                              if (medaktDataItem.name === contentItem.name) {
                                                // console.log(medaktDataItem.name, medaktDataItem.enumValueText)
                                                if (medaktDataItem.value === null || medaktDataItem.value === "") {
                                                  return (
                                                    <td align="left" style={{ color: "black", fontSize: 12 }}>-</td>
                                                  )
                                                }
                                                else {
                                                  return (
                                                    <td align="left" style={{ color: "black", fontSize: 12, whiteSpace: "nowrap", textOverflow: "hidden" }}>
                                                      {this.getGridFormItems(medaktDataItem)}
                                                    </td>
                                                  )
                                                }
                                              }
                                            })
                                          )
                                        }
                                      })
                                    )
                                  })
                                )
                              }
                              else {
                                return (
                                  section.contents.map(contentItem => {
                                    return (
                                      dataItem.attributes.map((dataItemAttr, index) => {
                                        if (dataItemAttr.type !== "Doc") {
                                          if (dataItemAttr.name === contentItem.name) {
                                            if (dataItemAttr.value === null || dataItemAttr.value === "") {
                                              // console.log("Name", dataItemAttr.name, "Value", dataItemAttr.value)
                                              return (
                                                <td align="left" style={{ color: "black", fontSize: 12 }}>-</td>
                                              )
                                            }
                                            else {
                                              return (
                                                <td align="left" style={{ color: "black", fontSize: 12, whiteSpace: "nowrap", textOverflow: "hidden" }}>
                                                  {this.getGridFormItems(dataItemAttr)}
                                                </td>
                                              )
                                            }
                                          }
                                        }
                                      })
                                    )
                                  })
                                )
                              }
                            }

                            else {
                              if (section.name === "PersonData") {
                                // console.log("PersonData section")
                                return (
                                  section.contents.map(contentItem => {
                                    return (
                                      dataItem.attributes.map((dataItemAttr, index) => {
                                        if (dataItemAttr.name === "Person") {
                                          return (
                                            dataItemAttr.subDocument.attributes.map((personDataItemAttr, index) => {
                                              if (personDataItemAttr.name === contentItem.name) {
                                                if (personDataItemAttr.value === null || personDataItemAttr.value === "") {
                                                  // console.log("Name", personDataItemAttr.name, "Value", personDataItemAttr.value)
                                                  return (
                                                    <td align="left" style={{ color: "black", fontSize: 12 }}>-</td>
                                                  )
                                                }
                                                else {
                                                  return (
                                                    <td align="left" style={{ color: "black", fontSize: 12, whiteSpace: "nowrap", textOverflow: "hidden" }}>
                                                      {this.getGridFormItems(personDataItemAttr)}
                                                    </td>
                                                  )
                                                }
                                              }
                                            })
                                          )
                                        }
                                      })
                                    )
                                  })
                                )
                              }
                              else {
                                return (
                                  section.contents.map(contentItem => {
                                    return (
                                      dataItem.attributes.map((dataItemAttr, index) => {
                                        if (dataItemAttr.type !== "Doc") {
                                          if (dataItemAttr.name === contentItem.name) {
                                            if (dataItemAttr.value === null || dataItemAttr.value === "" || dataItemAttr.value === "-") {
                                              // console.log("Name", dataItemAttr.name, "Value", dataItemAttr.value)
                                              return (
                                                <td align="left" style={{ color: "black", fontSize: 12 }}>-</td>
                                              )
                                            }
                                            else {
                                              return (
                                                <td align="left" style={{ color: "black", fontSize: 12, whiteSpace: "nowrap", textOverflow: "hidden" }}>
                                                  {this.getGridFormItems(dataItemAttr)}
                                                </td>
                                              )
                                            }
                                          }
                                        }
                                      })
                                    )
                                  })
                                )
                              }
                            }

                          })}
                        </tr>
                      ))}
                    </TableBody>
                  </Table>
                }
              </Paper>
              <Table>
                <TableFooter>
                  <TableRow>
                    <TableCell >
                      <div style={{ minWidth: 90, color: "black" }}>Кол-во записей</div>
                    </TableCell>
                    <TableCell>
                      <FormControl
                        variant="outlined"
                        style={{ minWidth: 30 }}
                      >
                        <Select
                          onChange={this.handleChangeRowsPerPage}
                          value={this.state.size}
                          menuPortalTarget={document.body}
                          styles={{ height: 25, color: "black", menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        >
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={15}>15</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell>
                      <Tooltip title="На первую страницу">
                        <IconButton onClick={() => this.KeyboardArrowLeftClick(2)}>
                          <FirstPageIcon style={{ fontSize: "large", color: "primary" }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="На предыдущюю страницу">
                        <IconButton onClick={() => this.KeyboardArrowLeftClick(this.state.page)}>
                          <ArrowBackIosIcon style={{ fontSize: "medium" }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell style={{ color: "black", fontSize: 16 }}>
                      Стр: <input style={{ maxWidth: 25 }} value={this.state.page} onChange={this.handleChange}></input>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Перейти на указанную страницу">
                        <Button
                          onClick={() => this.GoToPage()}
                          variant="outlined"
                          style={{
                            height: 22,
                            backgroundColor: "#D1D6D6",
                            fontSize: 12
                          }}
                        >перейти
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="На следующюю страницу">
                        <IconButton onClick={() => this.KeyboardArrowRightClick(this.state.page)}>
                          <ArrowForwardIosIcon style={{ fontSize: "medium" }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => this.downloadExcel()}
                        style={{
                          backgroundColor: "#047535",
                          color: "white"
                        }}
                      >В Excel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              <Snackbar
                open={this.state.showSnackBar}
                onClose={() => this.handleCloseSnackBar()}
                autoHideDuration={1200}
                message={this.state.snackBarMessage}
              />
            </Card>
          </Grid>
        </Grid>
      )
    }
    catch (error) {
      console.log("ERROR", error)
      this.handleCloseCurrentTab(this.state.process_id)
      return <LinearProgress />
    }
  }
}
export default GridForm;
