<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    setup() {
        const router = useRouter();

        const user = reactive({
            name: "",
            email: "",
            whatsapp_num: "",
            password: "",
            password_confirmation: "",
        });

        const validation = ref([]);

        function register() {
            let name = user.name;
            let email = user.email;
            let whatsapp_num = user.whatsapp_num;
            let password = user.password;
            let password_confirmation = user.password_confirmation;

            axios
                .post("http://127.0.0.1:8080/api/register", {
                    name,
                    email,
                    password,
                    password_confirmation,
                    whatsapp_num,
                })
                .then(() => {
                    return router.push({
                        name: "login",
                    });
                })
                .catch((error) => {
                    validation.value = error.response.data;
                });
        }

        return {
            user,
            validation,
            register,
        };
    },
};
</script>

<template>
    <main class="form-signin w-100 m-auto text-center">
        <form @submit.prevent="register">
            <h2>Heroe Photography</h2>
            <h1 class="h3 mb-3 fw-normal">Sign Up</h1>

            <div class="row g-3">
                <div class="col-sm-6">
                    <label for="name" class="form-label">Full Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder=""
                        required
                        v-model="user.name"
                    />
                    <div v-if="validation.name" class="text-danger">
                        {{ validation.name[0] }} . Valid name is required.
                    </div>
                </div>

                <div class="col-sm-6">
                    <label for="whatsapp_num" class="form-label"
                        >WhatsApp Number</label
                    >
                    <input
                        type="number"
                        class="form-control"
                        id="whatsapp_num"
                        placeholder=""
                        required
                        v-model="user.whatsapp_num"
                    />
                    <div v-if="validation.whatsapp_num" class="text-danger">
                        {{ validation.whatsapp_num[0] }} . Valid whatsapp number
                        is required.
                    </div>
                </div>

                <div class="col-12">
                    <label for="email" class="form-label"
                        >Email <span class="text-muted">(Optional)</span></label
                    >
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="you@example.com"
                        v-model="user.email"
                    />
                    <div v-if="validation.email" class="text-danger">
                        {{ validation.email[0] }} . Please enter a valid email
                        address for shipping updates.
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="password" class="form-label">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder=""
                        required
                        v-model="user.password"
                    />
                    <div v-if="validation.password" class="text-danger">
                        {{ validation.password[0] }} . Valid password is
                        required.
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="password_confirmation" class="form-label"
                        >Re-enter Password</label
                    >
                    <input
                        type="password"
                        class="form-control"
                        id="password_confirmation"
                        placeholder=""
                        required
                        v-model="user.password_confirmation"
                    />
                    <small class="text-muted"
                        >Please re-enter your password</small
                    >
                    <div
                        v-if="validation.password_confirmation"
                        class="text-danger"
                    >
                        {{ validation.password_confirmation[0] }}
                        . Password must be same as before.
                    </div>
                </div>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">
                Sign up
            </button>
            <p class="mt-5 mb-3 text-muted">
                Have an account?
                <router-link :to="{ name: 'login' }">Sign In</router-link>
            </p>
        </form>
    </main>
</template>

<style scoped>
html,
body {
    height: 100%;
}

body {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.form-signin {
    max-width: 330px;
    padding: 15px;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>