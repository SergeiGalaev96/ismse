import React from "react";
import MainForm from "../MainForm/MainForm.jsx";
import Users from "../Users/Users.jsx";
import Person from "../Person/Person.jsx";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
class ComponentManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mainComponentMessage: null,
    }
    this.sendFieldValues = this.sendFieldValues.bind(this)
    this.handleCloseCurrentTab = this.handleCloseCurrentTab.bind(this)
    this.clearTabData = this.clearTabData.bind(this)
    this.showScanComponentClick = this.showScanComponentClick.bind(this)
    this.pushNewBlobs = this.pushNewBlobs.bind(this)
    this.pushNewImages = this.pushNewImages.bind(this)
  }
  sendFieldValues(commandJson) {
    this.props.sendFieldValues(commandJson)
  }
  handleCloseCurrentTab(process_id) {
    this.props.handleCloseCurrentTab(process_id)
  }
  clearTabData(process_id) {
    this.props.clearTabData(process_id)
  }
  showScanComponentClick() {
    this.props.showScanComponentClick()
  }
  pushNewBlobs(blobs) {
    this.props.pushNewBlobs(blobs)
  }
  pushNewImages(images) {
    this.props.pushNewImages(images)
  }
  render() {
    // console.log("Main PROP", this.props)
    if (!this.props.adminMessage) return <LinearProgress />
    else if (this.props.adminMessage.taskType === "showPersonForm" || this.props.adminMessage.taskType === "showPersonFormNRSZ") {
      return (
        <Person
          userId={this.props.userId}
          userRole={this.props.userRole}
          process_id={this.props.adminMessage.process_id}
          session_id={this.props.adminMessage.session_id}
          organizationId={this.props.organizationId}
          enumData={this.props.adminMessage.enumData}
          selectedDoc={this.props.adminMessage.selectedDoc}
          documentViewForm={this.props.adminMessage.documentViewForm}
          buttons={this.props.adminMessage.buttons}
          gridFormButtons={this.props.adminMessage.gridFormButtons}
          taskID={this.props.adminMessage.taskID}
          sendFieldValues={this.sendFieldValues}
          formType={this.props.adminMessage.formType}
          docList={this.props.adminMessage.docList}
          size={this.props.adminMessage.size}
          page={this.props.adminMessage.page}
          subDocument={false}
          taskType={this.props.adminMessage.taskType}
          SOAT={this.props.adminMessage.SOAT}
          clearTabData={this.clearTabData}
          handleCloseCurrentTab={this.handleCloseCurrentTab}
        />
      )
    }

    else if (
      this.props.adminMessage.taskType === "showRegForm" ||
      this.props.adminMessage.taskType === "showChildRegForm" ||
      this.props.adminMessage.taskType === "showRegSearchForm" ||
      this.props.adminMessage.taskType === "showChildRegSearchForm" ||
      this.props.adminMessage.taskType === "showDetailedForm" ||
      this.props.adminMessage.taskType === "showChildDetailedForm" ||
      this.props.adminMessage.taskType === "showDetailedSearchForm" ||
      this.props.adminMessage.taskType === "showChildDetailedSearchForm" ||
      this.props.adminMessage.taskType === "showIPRForm" ||
      this.props.adminMessage.taskType === "showChildIPRForm" ||
      this.props.adminMessage.taskType === "showIPRSearchForm" ||
      this.props.adminMessage.taskType === "showChildIPRSearchForm" ||
      this.props.adminMessage.taskType === "searchAdultsDetailedForm" ||
      this.props.adminMessage.taskType === "searchChildDetailedForm" ||
      this.props.adminMessage.taskType === "showMemoForm" ||
      this.props.adminMessage.taskType === "showComplaintsForm" ||
      this.props.adminMessage.taskType === "showSearchComplaintsForm" ||
      this.props.adminMessage.taskType === "showAppealsForm" ||
      this.props.adminMessage.taskType === "showSearchAppealsForm" ||
      this.props.adminMessage.taskType === "showAdultsStatesSelectingForm" ||
      this.props.adminMessage.taskType === "showChildStatesSelectingForm" ||
      this.props.adminMessage.taskType === "showDownloadAdultsMedaktForm" ||
      this.props.adminMessage.taskType === "showDownloadChildMedaktForm"
    ) {
      // console.log("EnumData", JSON.stringify(this.props.adminMessage.enumData))
      return (
        <MainForm
          key={this.props.adminMessage.process_id}
          ismseApi={this.props.ismseApi}
          userId={this.props.userId}
          userRole={this.props.userRole}
          userFullName={this.props.userFullName}
          signDocument={this.props.signDocument}
          changeStatus={this.props.changeStatus}
          organizationId={this.props.organizationId}
          process_id={this.props.adminMessage.process_id}
          session_id={this.props.adminMessage.session_id}
          taskID={this.props.adminMessage.taskID}
          docId={this.props.adminMessage.docId}
          enumData={this.props.adminMessage.enumData}
          Form={this.props.adminMessage.Form}
          documentViewForm={this.props.adminMessage.documentViewForm}
          subDocument={false}
          adultsIPRForm={this.props.adminMessage.adultsIPRForm}
          selectedDoc={this.props.adminMessage.selectedDoc}
          SOAT={this.props.adminMessage.SOAT}
          person={this.props.adminMessage.person}
          personEnumData={this.props.adminMessage.personEnumData}
          personFormType={this.props.adminMessage.personFormType}
          buttons={this.props.adminMessage.buttons}
          gridForm={this.props.adminMessage.gridForm}
          IPRGridForm={this.props.adminMessage.IPRGridForm}
          gridFormButtons={this.props.adminMessage.gridFormButtons}
          formType={this.props.adminMessage.formType}
          docList={this.props.adminMessage.docList}
          docListIPR={this.props.adminMessage.docListIPR}
          size={this.props.adminMessage.size}
          page={this.props.adminMessage.page}
          userAction={this.props.adminMessage.userAction}
          taskType={this.props.adminMessage.taskType}
          selectedTab={this.props.selectedTab}
          showScanComponent={this.props.showScanComponent}
          showScanComponentClick={this.showScanComponentClick}
          sendFieldValues={this.sendFieldValues}
          handleCloseCurrentTab={this.handleCloseCurrentTab}
          clearTabData={this.clearTabData}
          pushNewBlobs={this.pushNewBlobs}
          scannedBlobs={this.props.scannedBlobs}
          pushNewImages={this.pushNewImages}
          scannedImages={this.props.scannedImages}
          callSuccessToast={this.props.callSuccessToast}
          callErrorToast={this.props.callErrorToast}
        />
      )
    }
    else if (
      this.props.adminMessage.taskType === "showSearchUser" ||
      this.props.adminMessage.taskType === "showCreateUser" ||
      this.props.adminMessage.taskType === "showEditUser" ||
      this.props.adminMessage.taskType === "showUserMonitoring"
    ) {
      return (
        <Users
          key={this.props.adminMessage.process_id}
          userId={this.props.userId}
          userRole={this.props.userRole}
          organizationId={this.props.organizationId}
          process_id={this.props.adminMessage.process_id}
          session_id={this.props.adminMessage.session_id}
          taskID={this.props.adminMessage.taskID}
          docId={this.props.adminMessage.docId}
          enumData={this.props.adminMessage.enumData}
          Form={this.props.adminMessage.Form}
          selectedDoc={this.props.adminMessage.selectedDoc}
          organizationIdList={this.props.adminMessage.organizationIdList}
          adultsIPRForm={this.props.adminMessage.adultsIPRForm}
          buttons={this.props.adminMessage.buttons}
          gridForm={this.props.adminMessage.gridForm}
          gridFormButtons={this.props.adminMessage.gridFormButtons}
          docList={this.props.adminMessage.docList}
          sendFieldValues={this.sendFieldValues}
          clearTabData={this.clearTabData}
          taskType={this.props.adminMessage.taskType}
          callSuccessToast={this.props.callSuccessToast}
          callErrorToast={this.props.callErrorToast}
        />
      )
    }
    else if (this.props.adminMessage.taskType === "error") {
      return (
        <Grid container direction="row" justify="center" spacing={0}>
          <Grid item xs={12}>
            <Card>
              <table>
                <tbody>
                  <tr>
                    <td>{this.props.adminMessage.taskType}</td>
                  </tr>
                  <tr>
                    <td>{this.props.adminMessage.process_id}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Grid>
        </Grid>
      )
    }
    else {
      console.log("SOMETHING WRONG", this.props.adminMessage)
      return (
        <Grid container direction="row" justify="center" spacing={0}>
          <Grid item xs={12}>
            <Card>
              <LinearProgress />
            </Card>
          </Grid>
        </Grid>
      )
    }
  }
}
export default ComponentManager
