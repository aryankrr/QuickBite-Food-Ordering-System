class Address {
    constructor({ id, userId, recipientName, primaryPhone, alternatePhone, addressType, buildingHostel, roomFlatNumber, landmark, city = 'Pune', pincode }) {
        this.id = id;
        this.userId = userId;
        this.recipientName = recipientName;
        this.primaryPhone = primaryPhone;
        this.alternatePhone = alternatePhone || '';
        this.addressType = addressType;
        this.buildingHostel = buildingHostel;
        this.roomFlatNumber = roomFlatNumber;
        this.landmark = landmark || '';
        this.city = city;
        this.pincode = pincode;
    }

    getFormattedDetails() {
        return `${this.buildingHostel}, Room/Flat ${this.roomFlatNumber}, Near ${this.landmark}, ${this.city} - ${this.pincode} (Ph: ${this.primaryPhone}, Alt: ${this.alternatePhone || 'N/A'})`;
    }
}

module.exports = Address;