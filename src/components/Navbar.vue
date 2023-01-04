<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    setup() {
        const token = localStorage.getItem("token");

        const router = useRouter();

        const user = ref("");

        onMounted(() => {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            axios
                .get("http://127.0.0.1:8080/api/user")
                .then((response) => {
                    user.value = response.data;
                })
                .catch((error) => {
                    error.response.data;
                });
        });

        function logout() {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            axios
                .post("http://127.0.0.1:8080/api/logout")
                .then((response) => {
                    if (response.data.success) {
                        window.localStorage.clear();
                        return router.go({
                            name: "home",
                        });
                    }
                })
                .catch((error) => {
                    error.response.data;
                });
        }

        return {
            token,
            user,
            logout,
        };
    },
};
</script>

<template>
    <nav
        class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark"
        aria-label="Ninth navbar example"
    >
        <div class="container-xl">
            <a class="navbar-brand" href="/">Heroe Photography</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarsExample07XL"
                aria-controls="navbarsExample07XL"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExample07XL">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a
                            class="nav-link active"
                            aria-current="page"
                            href="/home"
                            >Home</a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/gallery">Gallery</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">FAQ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/pricing">Pricing</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            >Order</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" href="/order">Order</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="/order/list"
                                    >Order List</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About Us</a>
                    </li>
                </ul>

                <form
                    class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                    role="search"
                >
                    <input
                        type="search"
                        class="form-control form-control-dark text-bg-dark"
                        placeholder="Search..."
                        aria-label="Search"
                    />
                </form>

                <div class="text-end" v-if="!token">
                    <router-link
                        :to="{ name: 'login' }"
                        class="btn btn-outline-light me-2"
                        >Login</router-link
                    >
                    <router-link
                        :to="{ name: 'register' }"
                        class="btn btn-warning"
                        >Sign-up</router-link
                    >
                </div>

                <div class="dropdown text-end" v-if="token">
                    <a
                        href="#"
                        class="
                            d-block
                            link-dark
                            text-decoration-none
                            dropdown-toggle
                        "
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="https://github.com/mdo.png"
                            alt="mdo"
                            width="32"
                            height="32"
                            class="rounded-circle"
                        />
                    </a>
                    <ul class="dropdown-menu text-small">
                        <li>
                            <a class="dropdown-item" href="#">{{
                                user.name
                            }}</a>
                        </li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                            <a
                                class="dropdown-item"
                                @click.prevent="logout"
                                style="cursor: pointer"
                                >Sign out</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
/* Show it is fixed to the top */
body {
    min-height: 75rem;
    padding-top: 4.5rem;
}

.navbar {
    margin-bottom: 20px;
}
</style>