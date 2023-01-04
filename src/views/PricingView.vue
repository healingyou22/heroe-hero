<script>
import axios from "axios";
import { onMounted, ref } from "vue";

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
    components: {
        Navbar,
        Footer,
    },
    setup() {
        let info = null;
        let loading = true;
        let info2 = ref([]);
        let errored = false;

        onMounted(() => {
            axios
                .get("http://127.0.0.1:8080/api/pricings")
                .then((result) => {
                    info = result.data;

                    info2.value = info.data.reduce((group, product) => {
                        const { pricing_type } = product;
                        const pricing_type2 = pricing_type
                            .replace(" ", "")
                            .toLowerCase();
                        group[pricing_type2] = group[pricing_type2] ?? [];
                        group[pricing_type2].push(product);
                        return group;
                    }, {});

                    console.log(info2);
                })
                .catch((error) => {
                    console.log(error);
                    errored = true;
                })
                .finally(() => (loading = false));
        });

        return {
            info,
            info2,
            loading,
            errored,
        };
    },
};
</script>

<template>
    <!-- Navbar -->
    <Navbar />
    <main>
        <div class="container">
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 class="display-4 fw-normal">Our Pricing</h1>
                <p class="fs-5 text-muted">
                    Quickly build an effective pricing table for your potential
                    customers with this Bootstrap example. It’s built with
                    default Bootstrap components and utilities with little
                    customization.
                </p>
            </div>

            <nav>
                <div
                    class="nav nav-tabs justify-content-center"
                    id="nav-tab"
                    role="tablist"
                >
                    <button
                        class="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                    >
                        Wedding
                    </button>
                    <button
                        class="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                    >
                        Prewedding
                    </button>
                    <button
                        class="nav-link"
                        id="nav-contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                    >
                        Akad Nikah
                    </button>
                    <button
                        class="nav-link"
                        id="nav-disabled-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-disabled"
                        type="button"
                        role="tab"
                        aria-controls="nav-disabled"
                        aria-selected="false"
                    >
                        Lamaran
                    </button>
                </div>
            </nav>

            <div class="tab-content" id="nav-tabContent">
                <div
                    class="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                    tabindex="0"
                >
                    <div
                        class="
                            row row-cols-1 row-cols-md-3
                            mb-3
                            text-center
                            py-3
                        "
                    >
                        <div
                            class="col"
                            v-for="(pricing, index) in info2.wedding"
                            :key="index"
                        >
                            <div class="card mb-4 rounded-3 shadow-sm">
                                <div class="card-header py-3">
                                    <h4 class="my-0 fw-normal">
                                        {{ pricing.pricing_name }}
                                    </h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">
                                        Rp {{ pricing.pricing_price }}
                                    </h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                        <li>{{ pricing.pricing_detail_1 }}</li>
                                        <li>{{ pricing.pricing_detail_2 }}</li>
                                        <li>{{ pricing.pricing_detail_3 }}</li>
                                        <li>{{ pricing.pricing_detail_4 }}</li>
                                        <li>{{ pricing.pricing_detail_5 }}</li>
                                        <li>{{ pricing.pricing_detail_6 }}</li>
                                        <li>{{ pricing.pricing_detail_7 }}</li>
                                        <li>{{ pricing.pricing_detail_8 }}</li>
                                        <li>{{ pricing.pricing_detail_9 }}</li>
                                        <li>{{ pricing.pricing_detail_10 }}</li>
                                    </ul>
                                    <router-link
                                        :to="{ name: 'order' }"
                                        class="
                                            w-100
                                            btn btn-lg btn-outline-primary
                                        "
                                        >Order</router-link
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                    tabindex="0"
                >
                    <div
                        class="
                            row row-cols-1 row-cols-md-3
                            mb-3
                            text-center
                            py-3
                        "
                    >
                        <div
                            class="col"
                            v-for="(pricing, index) in info2.prewedding"
                            :key="index"
                        >
                            <div class="card mb-4 rounded-3 shadow-sm">
                                <div class="card-header py-3">
                                    <h4 class="my-0 fw-normal">
                                        {{ pricing.pricing_name }}
                                    </h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">
                                        Rp {{ pricing.pricing_price }}
                                    </h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                        <li>{{ pricing.pricing_detail_1 }}</li>
                                        <li>{{ pricing.pricing_detail_2 }}</li>
                                        <li>{{ pricing.pricing_detail_3 }}</li>
                                        <li>{{ pricing.pricing_detail_4 }}</li>
                                        <li>{{ pricing.pricing_detail_5 }}</li>
                                        <li>{{ pricing.pricing_detail_6 }}</li>
                                        <li>{{ pricing.pricing_detail_7 }}</li>
                                        <li>{{ pricing.pricing_detail_8 }}</li>
                                        <li>{{ pricing.pricing_detail_9 }}</li>
                                        <li>{{ pricing.pricing_detail_10 }}</li>
                                    </ul>
                                    <router-link
                                        :to="{ name: 'order' }"
                                        class="
                                            w-100
                                            btn btn-lg btn-outline-primary
                                        "
                                        >Order</router-link
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                    tabindex="0"
                >
                    <div
                        class="
                            row row-cols-1 row-cols-md-3
                            mb-3
                            text-center
                            py-3
                        "
                    >
                        <div
                            class="col"
                            v-for="(pricing, index) in info2.akad"
                            :key="index"
                        >
                            <div class="card mb-4 rounded-3 shadow-sm">
                                <div class="card-header py-3">
                                    <h4 class="my-0 fw-normal">
                                        {{ pricing.pricing_name }}
                                    </h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">
                                        Rp {{ pricing.pricing_price }}
                                    </h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                        <li>{{ pricing.pricing_detail_1 }}</li>
                                        <li>{{ pricing.pricing_detail_2 }}</li>
                                        <li>{{ pricing.pricing_detail_3 }}</li>
                                        <li>{{ pricing.pricing_detail_4 }}</li>
                                        <li>{{ pricing.pricing_detail_5 }}</li>
                                        <li>{{ pricing.pricing_detail_6 }}</li>
                                        <li>{{ pricing.pricing_detail_7 }}</li>
                                        <li>{{ pricing.pricing_detail_8 }}</li>
                                        <li>{{ pricing.pricing_detail_9 }}</li>
                                        <li>{{ pricing.pricing_detail_10 }}</li>
                                    </ul>
                                    <router-link
                                        :to="{ name: 'order' }"
                                        class="
                                            w-100
                                            btn btn-lg btn-outline-primary
                                        "
                                        >Order</router-link
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="tab-pane fade"
                    id="nav-disabled"
                    role="tabpanel"
                    aria-labelledby="nav-disabled-tab"
                    tabindex="0"
                >
                    <div
                        class="
                            row row-cols-1 row-cols-md-3
                            mb-3
                            text-center
                            py-3
                        "
                    >
                        <div
                            class="col"
                            v-for="(pricing, index) in info2.lamaran"
                            :key="index"
                        >
                            <div class="card mb-4 rounded-3 shadow-sm">
                                <div class="card-header py-3">
                                    <h4 class="my-0 fw-normal">
                                        {{ pricing.pricing_name }}
                                    </h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">
                                        Rp {{ pricing.pricing_price }}
                                    </h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                        <li>{{ pricing.pricing_detail_1 }}</li>
                                        <li>{{ pricing.pricing_detail_2 }}</li>
                                        <li>{{ pricing.pricing_detail_3 }}</li>
                                        <li>{{ pricing.pricing_detail_4 }}</li>
                                        <li>{{ pricing.pricing_detail_5 }}</li>
                                        <li>{{ pricing.pricing_detail_6 }}</li>
                                        <li>{{ pricing.pricing_detail_7 }}</li>
                                        <li>{{ pricing.pricing_detail_8 }}</li>
                                        <li>{{ pricing.pricing_detail_9 }}</li>
                                        <li>{{ pricing.pricing_detail_10 }}</li>
                                    </ul>
                                    <router-link
                                        :to="{ name: 'order' }"
                                        class="
                                            w-100
                                            btn btn-lg btn-outline-primary
                                        "
                                        >Order</router-link
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <Footer />
        </div>
    </main>
</template>

<style scoped>
body {
    background-image: linear-gradient(180deg, #eee, #fff 100px, #fff);
}

.container {
    max-width: 960px;
}

.pricing-header {
    max-width: 700px;
    margin-top: 70px;
}
</style>