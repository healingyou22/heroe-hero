<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    setup() {
        const router = useRouter();

        const user = reactive({
            email: "",
            password: "",
        });

        const validation = ref([]);

        const loginFailed = ref(null);

        function login() {
            let email = user.email;
            let password = user.password;

            axios
                .post("http://127.0.0.1:8080/api/login", {
                    email,
                    password,
                })
                .then((response) => {
                    if (response.data.success) {
                        let user = response.data;

                        localStorage.setItem("data", JSON.stringify(user));
                        localStorage.setItem("token", response.data.token);

                        return router.push({
                            name: "home",
                        });
                    }
                    loginFailed.value = true;
                })
                .catch((error) => {
                    validation.value = error.response.data;
                });
        }

        return {
            user,
            validation,
            loginFailed,
            login,
        };
    },
};
</script>

<template>
    <main class="form-signin w-100 m-auto text-center">
        <div v-if="loginFailed" class="alert alert-danger" role="alert">
            Email atau Password Anda salah.
        </div>

        <form @submit.prevent="login">
            <h2>Heroe Photography</h2>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    v-model="user.email"
                />
                <label for="floatingInput">Email address</label>
                <div v-if="validation.email" class="text-danger">
                    {{ validation.email[0] }}
                </div>
            </div>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="user.password"
                />
                <label for="floatingPassword">Password</label>
                <div v-if="validation.password" class="text-danger">
                    {{ validation.password[0] }}
                </div>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">
                Sign in
            </button>
            <p class="mt-5 mb-3 text-muted">
                Don't have an account?
                <router-link :to="{ name: 'register' }">Sign Up</router-link>
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