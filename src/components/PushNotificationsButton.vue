<template>
    <div>
        <v-btn :loading="loading" :disabled="loading" @click="handleSubscriptionToggle"
            :color="isSubscribed ? 'success' : 'primary'">
            {{ buttonText }}
        </v-btn>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useNotificationsStore } from "@/store/modules/Notifications/notifications";
const notificationsStore = useNotificationsStore();

const VAPID_PUBLIC_KEY =
    "BE-8cae-zCSZ_l1ebivM7QcAIWjY81uc9tK4E4GYeVte2ARu-TTqnXXolhax5C2xwlEe9Xxj3eb6CqYBzYAGvPE";

const loading = ref(false);
const isSupported = ref(true);
const isSubscribed = ref(false);

const buttonText = computed(() => {
    if (!isSupported.value) return "Notifications Not Supported";
    if (loading.value) return "Processing...";
    return isSubscribed.value ? "Notifications Enabled" : "Enable Notifications";
});

/**
 * Converts a base64 encoded string to a Uint8Array, with padding if necessary
 * @param {string} base64String The base64 encoded string to convert
 * @returns {Uint8Array} The converted Uint8Array
 */
const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

function formatSubscriptionForBackend(subscription) {
    console.log("subscription", subscription);
    return {
        auth: subscription.toJSON().keys.auth,
        endpoint: subscription.endpoint,
        p256Dh: subscription.toJSON().keys.p256dh,
        userId: "1",
    };
}

/**
 * Send the given subscription to the backend to store it
 * @param {PushSubscription} subscription The subscription to store
 * @returns {Promise<Object>} The response from the server
 * @throws If the subscription cannot be stored on the server
 */
const sendSubscriptionToBackend = async (subscription) => {
    try {
        const formattedSubscription = formatSubscriptionForBackend(subscription);

        console.log("formattedSubscription", formattedSubscription);
        const response = await notificationsStore.subscribe(formattedSubscription);
        if (!response.ok) {
            throw new Error("Failed to store subscription on server");
        }

        return await response.json();
    } catch (error) {
        console.error("Error saving subscription:", error);
        throw error;
    }
};

/**
 * Handles toggling the push notification subscription state
 *
 * If the user is not currently subscribed, this function will
 * request permission to show notifications and if granted, will
 * subscribe the user to push notifications and store the
 * subscription on the server
 *
 * If the user is already subscribed, this function will unsubscribe
 * the user from push notifications and delete the subscription on
 * the server
 *
 * @returns {Promise<void>}
 */
const handleSubscriptionToggle = async () => {
    console.log("we are here  0");
    if (loading.value) return;

    console.log("we are here  1 before the try");

    try {
        loading.value = true;

        console.log("we are here  1 in the try");
        if (!isSubscribed.value) {

            console.log("Subscribing to push notifications...");
            console.log("we are here  2");
            console.log("isSubscribed", isSubscribed.value);
            const permission = await Notification.requestPermission();
            console.log("permission", permission); ``
            // if (permission !== "granted") {
            //   console.log("Notification permission denied");
            //   return;
            // }

            const registration = await navigator.serviceWorker.ready;
            console.log("registration", registration);

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
            });
            console.log("subscription", subscription);


            await sendSubscriptionToBackend(subscription);
            isSubscribed.value = true;

            console.log("Successfully subscribed to push notifications");
        } else {
            console.log("Unsubscribing from push notifications...");
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            if (subscription) {
                console.log("we are here  3");
                await subscription.unsubscribe();
            }
            isSubscribed.value = false;
        }
    } catch (error) {
        console.error("Error handling push notification subscription:", error);
    } finally {
        console.log("we are here  4");
        loading.value = false;
    }
};

/**
 * Checks whether the user is currently subscribed to push notifications
 *
 * @returns {Promise<void>}
 */
// const checkSubscription = async () => {
//   try {
//     const registration = await navigator.serviceWorker.ready;
//     const subscription = await registration.pushManager.getSubscription();
//     isSubscribed.value = !!subscription;
//   } catch (error) {
//     console.error("Error checking subscription status:", error);
//     isSubscribed.value = false;
//   }
// };
onMounted(async () => {
    // isSupported.value = "Notification" in window && "serviceWorker" in navigator;
    // if (isSupported.value) {
    //   await checkSubscription();
    // }
});
</script>
