<template>
    <div class="container-fluid setting-profile p-5">
        <div class="row">
            <div class="col-sm-6">
                <p>First name</p>
            </div>

            <div class="col-sm-6">
                <div class="container-fluid field-first-name">
                    <input class="field" type="text" placeholder="Your first name">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <p>Last name</p>
            </div>

            <div class="col-sm-6">
                <div class="container-fluid field-last-name">
                    <input class="field" type="text" placeholder="Your last name">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <p>Username</p>
            </div>

            <div class="col-sm-6">
                <div class="container-fluid field-username">
                    <input class="field" type="text" placeholder="Your username">
                    <svg class="icon" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="#13357B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <p>Country</p>
            </div>

            <div class="col-sm-6">
                <div class="container-fluid field-country">
                    <input class="field" type="text" placeholder="Your country">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <p>Email</p>
            </div>

            <div class="col-sm-6">
                <div class="container-fluid field-email">
                    <input class="field" type="text" placeholder="Your email">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <p>Password</p>
            </div>

            <div class="col-sm-6">
                <div class="container-fluid field-email">
                    <input class="field" type="password" placeholder="Your password">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <button class="btn-reset" style="width: 100%;">Reset your password</button>
            </div>
        </div>
        <div class="row annoucement">
            <div class="row">
                <p style="font-weight: bold;">
                    Click "Save" to confirm your changes
                </p>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <button class="btn-save">Save</button>
                </div>
                <div class="col-sm-6">
                    <button class="btn-cancel">Cancel</button>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>

export default{
    name : "Setting_Profile"
}

</script>

<style scoped>
.setting-profile {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    color: #13357B;
    font-size: 20px;
}

.col-sm-6 p {
    font-size: 25px;
    font-weight: 900;
    margin-left: 25%;
}

.col-sm-6 .field {
    color:#13357B !important;
    border-radius: 10px;
    border: 1px solid #13357B;
    background-color: #EDF6F9;
    padding: 10px 50px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.20);
    width: 90%;
}

.col-sm-6 .field::placeholder{
    color:#13357B;
}

.col-sm-6 .field:focus {
    color:#13357B;
    border-color: #13357B;
    outline: none;
    background-color: #8ECAE6;
}

.field-username {
    display: flex;
}

.field-username svg {
    position: relative;
    margin: 13px 0px 0 0;
    right: 580px;
}

.field:-webkit-autofill {
    -webkit-text-fill-color: #13357B;
    -webkit-box-shadow: 0 0 0px 1000px #EDF6F9 inset;
    transition: background-color 5000s ease-in-out 0s;
}

.field:-webkit-autofill:focus {
    -webkit-text-fill-color: #13357B;
}

.btn-reset{
    justify-content: center;
    color: #0077B6;
    border: none;
    background-color: transparent;
    font-weight: 900;
    text-align: center;
    margin-top: 100px;
}

.btn-reset:hover {
    color: #8ECAE6;
}

button {
    color: #EDF6F9;
    padding: 10px 30px;
    border-radius: 15px; 
    width: 250px;
    border: none;
}

.btn-save {
    background-color: #5fa8d3;
}

.btn-cancel {
    background-color: #E63946;
}

.btn-save:hover{
    background-color: #7FBADC;
}

.btn-cancel:hover{
    background-color: #ED6E78;
}

.annoucement {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: center;
    background-color: #9BD0E9;
    margin-top: 30px;
    padding: 100px 0px;
    border-radius: 20px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}

</style>

