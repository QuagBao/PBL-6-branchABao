<template>
    <div class="frame">
        <h3>About</h3>
        <div class="frame-description">
            <p class="text-break" >
                If you're interested in ancient history, Hue's imperial citadel should be at the top of your Vietnam itinerary. Skip the hassle of advance planning on a full-day tour from Hoi An, the ideal choice for first-time visitors with limited time. You'll travel... 
            </p>
            <button class="read-more-or-less">Read more</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "About"
}
</script>

<style scoped>
.frame {
    margin-top: 20px;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 5px 30px rgba(19, 53, 123, 0.2);
    display: flex;
    flex-direction: column;
    gap: 20px;
}
h3 { 
    font-weight: 900;
}
.read-more-or-less{
    color: #13357B;
    background: none;
    border: none;
    margin-left: -0.5%;
    font-size: 18px;
    font-weight: 700;
    appearance: none;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
}
.read-more-or-less:hover{
    color: #729AE9;
}
</style>