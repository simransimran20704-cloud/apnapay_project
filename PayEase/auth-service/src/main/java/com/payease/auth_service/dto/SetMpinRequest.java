package com.payease.auth_service.dto;

public class SetMpinRequest {
    private String mobileNumber;
    private String mpin;
    private String confirmMpin;

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getMpin() {
        return mpin;
    }

    public void setMpin(String mpin) {
        this.mpin = mpin;
    }

    public String getConfirmMpin() {
        return confirmMpin;
    }

    public void setConfirmMpin(String confirmMpin) {
        this.confirmMpin = confirmMpin;
    }
}