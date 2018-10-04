import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Icon } from "react-native-elements";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import validator from "validator";

import { InputText, Button, LinkButton, Toolbar, DatePicker, Checkbox, Phone } from "../components";
import { navigateBack } from "../helpers";

import styles from '../styles';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPasswordShown: false,
            isCmfPasswordShown: false,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            comfirmPassword: "",
            dateOfBirth: "",
            phone: "",
            inActiveNewsletter: false,
            termsConditions: false
        };
    }

    onIconPress = () => {
        this.setState({
            isPasswordShown: !this.state.isPasswordShown
        });
    }

    onIconPress2 = () => {
        this.setState({
            isCmfPasswordShown: !this.state.isCmfPasswordShown
        });
    }

    onChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    onActivateNewsletter = () => {
        this.setState({
            inActiveNewsletter: !this.state.inActiveNewsletter
        });
    }

    acceptTermsConditions = () => {
        this.setState({
            termsConditions: !this.state.termsConditions
        });
    }

    onSubmit = values => {
        console.log(values);
        alert("no errors");
    }


    renderTextInput = (field) => {
        const { meta: { touched, error }, placeholder, keyboardType, isPassword, label, secureTextEntry, input: { onChange, ...restInput } } = field;
        console.log(field)
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    keyboardType={keyboardType}
                    isPassword={isPassword}
                    label={label}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderDatePicker = (field) => {
        const { meta: { touched, error }, placeholder, label, input: { onChange, ...restInput } } = field;
        console.log(field);
        return (
            <View>
                <DatePicker
                    label={label}
                    onChangeText={onChange}
                    value={this.state.dateOfBirth}
                    placeholder={placeholder}
                    onChangeDate={value => this.onChange("dateOfBirth", value)}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderPhone = (field) => {
        const { meta: { touched, error }, placeholder, label, input: { onChange, ...restInput } } = field;
        console.log(field);
        return (
            <View>
                <Phone
                    label={label}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    render() {
        console.log("here");
        const { handleSubmit } = this.props;
        return (
            <View style={[styles.appContainer, styles.whiteBackground]}>
                <Toolbar style={styles.noBorderToolbar}>
                    <Icon
                        name="arrow-left"
                        size={24}
                        type="material-community"
                        onPress={navigateBack}
                        iconStyle={styles.leftIconContainer}
                    />
                    <View style={styles.toolbarUtils}>
                        <Text style={styles.appTitle}>Registration</Text>
                    </View>
                </Toolbar>
                <ScrollView>

                    <Field
                        name="firstName"
                        label="First name *"
                        placeholder="Enter first name"
                        maxLength={30}
                        component={this.renderTextInput}
                    />
                    <Field
                        name="lastName"
                        label="Last name *"
                        placeholder="Enter last name"
                        component={this.renderTextInput}
                        maxLength={30}
                    />
                    <Field
                        name="phone"
                        label="Phone *"
                        placeholder="Enter phone number"
                        keyboardType="number-pad"
                        component={this.renderPhone}
                        maxLength={10}
                    />
                    <Field
                        name="datePicker"
                        label="Date of birth *"
                        placeholder="Enter date of birth"
                        component={this.renderDatePicker}
                    />
                    <Field
                        name="email"
                        label="Email *"
                        placeholder="Enter email address"
                        component={this.renderTextInput}
                        keyboardType="email-address"
                    />
                    <Field
                        name="password"
                        label="Password *"
                        onIconPress={this.onIconPress}
                        isPassword={true}
                        secureTextEntry={!this.state.isPasswordShown}
                        placeholder="Enter password"
                        component={this.renderTextInput} />
                    <Field
                        name="confirmpassword"
                        label="Confirm Password *"
                        onIconPress={this.onIconPress2}
                        isPassword={true}
                        secureTextEntry={!this.state.isCmfPasswordShown}
                        placeholder="Re-enter password"
                        component={this.renderTextInput}
                    />
                    <View style={{ paddingVertical: 16 }}>
                        <Checkbox
                            onPress={this.onActivateNewsletter}
                            checked={this.state.inActiveNewsletter}
                            labelComponent={
                                <View style={{ flexDirection: "row", paddingHorizontal: 16, }}>
                                    <Text style={styles.checkboxText}>Subscribe the </Text>
                                    <LinkButton
                                        title="Newsletter"
                                        color="rgb(15, 113, 184)" />
                                </View>
                            } />
                        <Checkbox
                            onPress={this.acceptTermsConditions}
                            checked={this.state.termsConditions}
                            labelComponent={
                                <View>
                                    <View style={{ flexDirection: "row", overflow: "hidden", flex: 1, paddingLeft: 16, paddingRight: 32 }}>
                                        <Text style={styles.checkboxText}>I agree to </Text>
                                        <LinkButton
                                            title="Terms & Conditions"
                                            color="rgb(15, 113, 184)" />
                                    </View>
                                    <View style={{ flexDirection: "row", overflow: "hidden", flex: 1, paddingLeft: 16, paddingRight: 32 }}>
                                        <Text style={styles.checkboxText}> and </Text>
                                        <LinkButton
                                            title="Privacy Policy"
                                            color="rgb(15, 113, 184)" />
                                    </View>
                                </View>
                            } />
                    </View>



                    <Button
                        title="Register"
                        backgroundColor="rgb(15, 113, 184)"
                        onPress={handleSubmit(this.onSubmit)} />

                </ScrollView>
            </View>
        );
    }
}



const validate = values => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = "Rerquired"
    } else if (values.firstName.length < 8) {
        errors.firstName = "Length should me greater than 8";
    } else if (values.firstName.length > 30) {
        errors.firstName = "Length should me less than 30";
    } else if (!/^[a-zA-Z ]+$/.test(values.firstName.trim())) {
        errors.name = "Please enter a valid name"
    }

    if (!values.lastName) {
        errors.lastName = "Rerquired"
    } else if (values.lastName.length < 8) {
        errors.lastName = "Length should me greater than 8";
    } else if (values.lastName.length > 30) {
        errors.lastName = "Length should me less than 30";
    } else if (!/^[a-zA-Z ]+$/.test(values.lastName.trim())) {
        errors.name = "Please enter a valid name"
    }

    if (!values.datePicker) {
        errors.datePicker = "Required"
    }
    if (!values.phone) {
        errors.phone = "Required"
    } else if (!validator.isNumeric(values.phone.trim())) {
        errors.phone = "Please enter a valid phone"
    } else if (values.phone.length > 10) {
        errors.lastName = "Mobile number should be 10 digits";
    }

    if (!values.email) {
        errors.email = "Required"
    } else if (!validator.isEmail(values.email.trim())) {
        errors.email = "Please enter a valid email"
    }

    if (!values.password) {
        errors.password = "Required"
    }
    if (!values.confirmpassword) {
        errors.confirmpassword = "Required"
    }

    return errors;
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: "register", validate })
)(Register);

