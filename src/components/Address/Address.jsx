import React from "react";
// import Grid from "@material-ui/core/Grid";
// import Card from "components/Card/Card.jsx";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TextField from '@material-ui/core/TextField';

import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[1-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
      // placeholderChar={'\u2000'}
      showMask
    />
  );
}

class Address extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    console.log("ADDRESS PROPS", this.props)
  }

  // Select components change handlers
  // countryChange=(event) =>  {
  //   event.preventDefault()
  //   this.props.countryChange(event)
  // }

  regionChange = (event) => {
    event.preventDefault()
    this.props.regionChange(event)
  }
  districtChange = (event) => {
    event.preventDefault()
    this.props.districtChange(event)
  }
  subDistrictChange = (event) => {
    event.preventDefault()
    this.props.subDistrictChange(event)
  }
  villageChange = (event) => {
    event.preventDefault()
    this.props.villageChange(event)
  }

  addressChange = (event) => {
    event.preventDefault()
    this.props.handleChange(event)
    // console.log("changing field value", event.target.name, event.target.value)
  }
  phoneChange = (event) => {
    event.preventDefault()
    this.props.handleChange(event)
    // console.log("changing field value", event.target.name, event.target.value)
  }
  placeOfLivingChange = (event) => {
    // event.preventDefault()
    this.props.placeOfLivingChange(event)
    // console.log("changing field value", event.target.name, event.target.value)
  }

  // Collecting enum data
  getRegionEnumValues() {
    let reg = []
    if (this.props.Country !== null && this.props.Country !== undefined && this.props.Country !== "") {
      for (var i = 0; i < this.props.SOAT.countries.length; i++) {
        if (this.props.Country === this.props.SOAT.countries[i].code) {
          reg = this.props.SOAT.countries[i].regions
        }
      }
    }
    return reg
  }
  getDistrictEnumValues() {
    let distr = []
    if (this.props.Region !== null && this.props.Region !== undefined && this.props.Region !== "") {
      for (var i = 0; i < this.props.SOAT.countries.length; i++) {
        if (this.props.Country === this.props.SOAT.countries[i].code) {
          for (var j = 0; j < this.props.SOAT.countries[i].regions.length; j++) {
            if (this.props.SOAT.countries[i].regions !== undefined) {
              if (this.props.Region === this.props.SOAT.countries[i].regions[j].code) {
                if (this.props.SOAT.countries[i].regions[j].districts !== undefined) {
                  distr = this.props.SOAT.countries[i].regions[j].districts
                }
              }
            }
          }
        }
      }
    }
    return distr
  }
  getSubDistrictEnumValues() {
    // console.log("DISTRICT", this.props.Country, this.props.Region, this.props.District)
    let subDistr = []
    if (this.props.District !== null && this.props.District !== undefined && this.props.District !== "") {
      for (var i = 0; i < this.props.SOAT.countries.length; i++) {
        if (this.props.Country === this.props.SOAT.countries[i].code) {
          for (var j = 0; j < this.props.SOAT.countries[i].regions.length; j++) {
            if (this.props.Region === this.props.SOAT.countries[i].regions[j].code) {
              if (this.props.SOAT.countries[i].regions[j].districts !== undefined) {
                for (var k = 0; k < this.props.SOAT.countries[i].regions[j].districts.length; k++) {
                  if (this.props.SOAT.countries[i].regions[j].districts[k].subDistricts !== undefined) {
                    if (this.props.District === this.props.SOAT.countries[i].regions[j].districts[k].code) {
                      subDistr = this.props.SOAT.countries[i].regions[j].districts[k].subDistricts
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return subDistr
  }
  getVillageEnumValues() {
    let vil = []
    if (this.props.subDistrict !== null && this.props.subDistrict !== undefined && this.props.subDistrict !== "") {
      for (var i = 0; i < this.props.SOAT.countries.length; i++) {
        if (this.props.Country === this.props.SOAT.countries[i].code) {
          for (var j = 0; j < this.props.SOAT.countries[i].regions.length; j++) {
            if (this.props.Region === this.props.SOAT.countries[i].regions[j].code) {
              for (var k = 0; k < this.props.SOAT.countries[i].regions[j].districts.length; k++) {
                if (this.props.SOAT.countries[i].regions[j].districts[k].subDistricts !== undefined) {
                  if (this.props.District === this.props.SOAT.countries[i].regions[j].districts[k].code) {
                    for (var l = 0; l < this.props.SOAT.countries[i].regions[j].districts[k].subDistricts.length; l++) {
                      if (this.props.SOAT.countries[i].regions[j].districts[k].subDistricts[l].villages !== undefined) {
                        // console.log("CODES", this.props.subDistrictCode, this.props.SOAT.countries[i].regions[j].districts[k].subDistricts[l].code)
                        if (this.props.subDistrict === this.props.SOAT.countries[i].regions[j].districts[k].subDistricts[l].code) {
                          // console.log("Villages", this.props.SOAT.countries[i].regions[j].districts[k].subDistricts[l].villages)
                          vil = this.props.SOAT.countries[i].regions[j].districts[k].subDistricts[l].villages
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
    return vil
  }
  getPlaceOfLivingEnumValues() {
    let options = []
    if (this.props.enumData !== null && this.props.enumData !== undefined) {
      for (let e = 0; e < this.props.enumData.length; e++) {
        if (this.props.enumData[e].enumDef === "2D1C2089-B970-47FC-BD73-2F241FAC12B5") {
          for (let d = 0; d < this.props.enumData[e].data.length; d++) {
            options.push(this.props.enumData[e].data[d])
          }
        }
      }
    }
    // console.log("OPTS", options)
    return options
  }

  // componentChange = (event) => {
  //   // this.state[event.target.name] = event.target.value
  //   // console.log("CHANGE", event.target.name, event.target.value)
  // }
  render() {
    if (!this.props.SOAT) return null
    return (
      <Table>
        <TableBody>
          {/* <TableRow key="Country" style={{ height: 30 }}>
            <TableCell
              style={{ minWidth: 200, maxWidth: 220 }}
            // style={{maxWidth: 300}}
            >Страна</TableCell>
            <TableCell>
              <FormControl
                variant="outlined"
                key="Country"
                style={{ minWidth: 260, maxWidth: 350 }}
              >
                <Select
                  key="Country"
                  // onChange={this.countryChange}
                  name="Country"
                  input={<OutlinedInput name={"Country"} labelWidth={0} />}
                  disabled={true}
                  style={{ height: 30 }}
                  value={this.props.Country}
                >
                  <MenuItem value={null}>
                    <em></em>
                  </MenuItem>
                  {this.props.SOAT.countries.map((country, index) => (
                    <MenuItem
                      value={country.code}
                    >
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow> */}
          <TableRow key="Region" style={{ height: 30 }}>
            <TableCell
              style={{ minWidth: 200, maxWidth: 220 }}
            // style={{maxWidth: 300}}
            >Область</TableCell>
            <TableCell>
              <FormControl
                variant="outlined"
                key="Region"
                style={{ minWidth: 260, maxWidth: 350 }}
              >
                <Select
                  key="Region"
                  onChange={this.regionChange}
                  name={"Region"}
                  input={<OutlinedInput name={"Region"} labelWidth={0} />}
                  disabled={(this.props.formType === "view" || this.props.edit === false) ? true : false}
                  value={this.props.Region}
                  menuPortalTarget={document.body}
                  styles={{ height: 30, menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                >
                  <MenuItem value={null}>
                    <em></em>
                  </MenuItem>
                  {this.getRegionEnumValues().map((region, index) => (
                    <MenuItem
                      value={region.code}
                    >
                      {region.name}
                    </MenuItem>
                  ))
                  }
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow key="District" style={{ height: 30 }}>
            <TableCell
              style={{ minWidth: 200, maxWidth: 220 }}
            // style={{maxWidth: 300}}
            >Район/город</TableCell>
            <TableCell>
              <FormControl
                variant="outlined"
                key="District"
                style={{ minWidth: 260, maxWidth: 300 }}
              >
                <Select
                  key="District"
                  onChange={this.districtChange}
                  name={"District"}
                  input={<OutlinedInput name={"District"} labelWidth={0} />}
                  disabled={(this.props.formType === "view" || this.props.edit === false) ? true : false}
                  value={this.props.District}
                  menuPortalTarget={document.body}
                  styles={{ height: 30, menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                >
                  <MenuItem value={null}>
                    <em></em>
                  </MenuItem>
                  {this.getDistrictEnumValues().map((district, index) => (
                    <MenuItem
                      key={index}
                      value={district.code}
                    >
                      {district.name}
                    </MenuItem>
                  ))
                  }
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          {this.props.formName !== "RegistrationSearchForm" &&
            this.props.formName !== "AdultsDetailedSearchForm" &&
            this.props.formName !== "AdultsIPRSearchForm" &&
            this.props.formName !== "DownloadAdultsMedaktForm" &&
            this.props.formName !== "DownloadChildMedaktForm" &&
            <TableRow key="subDistrict" style={{ height: 30 }}>
              <TableCell style={{ minWidth: 250, maxWidth: 300 }}>Джамоат</TableCell>
              <TableCell>
                <FormControl
                  variant="outlined"
                  key="subDistrict"
                  style={{ minWidth: 260, maxWidth: 350 }}
                >
                  <Select
                    key="subDistrict"
                    onChange={this.subDistrictChange}
                    name={"subDistrict"}
                    input={<OutlinedInput name={"subDistrict"} labelWidth={0} />}
                    disabled={(this.props.formType === "view" || this.props.edit === false) ? true : false}
                    value={this.props.subDistrict}
                    menuPortalTarget={document.body}
                    styles={{ height: 30, menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  >
                    <MenuItem value={null}>
                      <em></em>
                    </MenuItem>
                    {this.getSubDistrictEnumValues().map((subDistrict, index) => (
                      <MenuItem
                        value={subDistrict.code}
                      >
                        {subDistrict.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          }
          {this.props.formName !== "RegistrationSearchForm" &&
            this.props.formName !== "AdultsDetailedSearchForm" &&
            this.props.formName !== "AdultsIPRSearchForm" &&
            this.props.formName !== "DownloadAdultsMedaktForm" &&
            this.props.formName !== "DownloadChildMedaktForm" &&
            <TableRow key="Village" style={{ height: 30 }}>
              <TableCell style={{ minWidth: 250 }}>Село</TableCell>
              <TableCell>
                <FormControl
                  variant="outlined"
                  key="Village"
                  style={{ minWidth: 260, maxWidth: 350 }}
                >
                  <Select
                    key="Village"
                    onChange={this.villageChange}
                    name={"Village"}
                    input={<OutlinedInput name={"Village"} labelWidth={0} />}
                    disabled={(this.props.formType === "view" || this.props.edit === false) ? true : false}
                    value={this.props.Village}
                    menuPortalTarget={document.body}
                    styles={{ height: 30, menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  >
                    <MenuItem value={null}>
                      <em></em>
                    </MenuItem>
                    {this.getVillageEnumValues().map((Village, index) => (
                      <MenuItem
                        value={Village.code}
                      >
                        {Village.name}
                      </MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          }
          {this.props.formName !== "RegistrationSearchForm" &&
            this.props.formName !== "AdultsDetailedSearchForm" &&
            this.props.formName !== "AdultsIPRSearchForm" &&
            this.props.formName !== "DownloadAdultsMedaktForm" &&
            this.props.formName !== "DownloadChildMedaktForm" &&
            <TableRow style={{ height: 30 }}>
              <TableCell style={{ minWidth: 250 }}>Дом/кв/ул.</TableCell>
              <TableCell>
                <TextField
                  // onChange={this.componentChange}
                  onBlur={this.addressChange}
                  name={"ResidentialAddress"}
                  style={{ minWidth: 260, maxWidth: 350, height: 30 }}
                  disabled={(this.props.formType === "view" || this.props.edit === false) ? true : false}
                  defaultValue={this.props.ResidentialAddress}
                  value={null}
                />
              </TableCell>
            </TableRow>
          }
          {this.props.formName !== "RegistrationSearchForm" &&
            this.props.formName !== "AdultsDetailedSearchForm" &&
            this.props.formName !== "AdultsIPRSearchForm" &&
            this.props.formName !== "DownloadAdultsMedaktForm" &&
            this.props.formName !== "DownloadChildMedaktForm" &&
            <TableRow style={{ height: 30 }}>
              <TableCell style={{ minWidth: 250 }}>№ телефона</TableCell>
              <TableCell>
                <TextField
                  onBlur={this.phoneChange}
                  name={"Phone"}
                  style={{ minWidth: 260, maxWidth: 350, height: 30 }}
                  disabled={(this.props.formType === "view" || this.props.edit === false) ? true : false}
                  defaultValue={this.props.Phone}
                  value={null}
                />
                {/* <FormControl>
                  <Input
                    name={"Phone"}
                    value={(this.props.Phone !== undefined) ? this.props.Phone : ""}
                    onChange={this.componentChange}
                    onBlur={this.phoneChange}
                    style={{ minWidth: 260, maxWidth: 350, height: 30 }}
                    disabled={(this.props.formType === "view" || this.props.edit === false) ? true : false}
                    inputComponent={TextMaskCustom}
                  />
                </FormControl> */}
              </TableCell>
            </TableRow>
          }
          {this.props.formName !== "RegistrationSearchForm" &&
            this.props.formName !== "AdultsDetailedSearchForm" &&
            this.props.formName !== "AdultsIPRSearchForm" &&
            this.props.formName !== "DownloadAdultsMedaktForm" &&
            this.props.formName !== "DownloadChildMedaktForm" &&

            <TableRow key="Village" style={{ height: 30 }}>
              <TableCell style={{ minWidth: 250 }}>Место проживания</TableCell>
              <TableCell>
                <FormControl
                  variant="outlined"
                  key="PlaceOfLiving"
                  style={{ minWidth: 260, maxWidth: 350 }}
                >
                  <Select
                    key="PlaceOfLiving"
                    onChange={this.placeOfLivingChange}
                    name={"PlaceOfLiving"}
                    input={<OutlinedInput name={"PlaceOfLiving"} labelWidth={0} />}
                    disabled={(this.props.formType === "view" || this.props.edit === false) ? true : false}
                    value={this.props.PlaceOfLiving}
                    menuPortalTarget={document.body}
                    styles={{ height: 30, menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  >
                    {this.getPlaceOfLivingEnumValues().map((PlaceOfLiving, index) => (
                      <MenuItem
                        value={PlaceOfLiving.Id}
                      >
                        {PlaceOfLiving.Text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    )
  }
}
export default Address
