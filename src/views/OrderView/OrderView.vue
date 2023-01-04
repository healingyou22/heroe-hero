<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";

import { useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
    components: {
        Navbar,
        Footer,
    },
    setup() {
        const router = useRouter();

        let pricings = ref([]);

        const order = reactive({
            pricing_id: "",
            pricing_name: "",
            pricing_type: "",
            full_name: "",
            whatsapp_num: "",
            address: "",
            date: "",
            location: "",
            total_price: "",
            email: "",
        });

        onMounted(() => {
            axios
                .get("http://127.0.0.1:8080/api/pricings")
                .then((result) => {
                    pricings.value = result.data.data;
                })
                .catch((err) => {
                    err.response;
                });
        });

        function getPricingPrice() {
            let pricing_id = order.pricing_id;
            axios
                .get(`http://127.0.0.1:8080/api/pricings/${pricing_id}`)
                .then((result) => {
                    order.total_price = result.data.data.pricing_price;
                    order.pricing_name = result.data.data.pricing_name;
                    order.pricing_type = result.data.data.pricing_type;
                })
                .catch((err) => {
                    err.response;
                });
        }

        const validation = ref([]);

        function makeOrder() {
            let pricing_id = order.pricing_id;
            let full_name = order.full_name;
            let address = order.address;
            let whatsapp_num = order.whatsapp_num;
            let date = order.date;
            let location = order.location;
            let total_price = order.total_price;

            axios
                .post("http://127.0.0.1:8080/api/orders", {
                    pricing_id,
                    full_name,
                    address,
                    whatsapp_num,
                    date,
                    location,
                    total_price,
                })
                .then(() => {
                    const $toast = useToast();
                    let instance = $toast.success("Order placed.", {
                        position: "top-right",
                        duration: 3000,
                    });

                    // Force dismiss specific toast
                    // instance.dismiss();

                    // Dismiss all opened toast immediately
                    // $toast.clear();

                    return router.push({
                        name: "order.list",
                    });
                })
                .catch((error) => {
                    if (error.response.data == "Failed~") {
                        const $toast = useToast();
                        let instance = $toast.warning(
                            "Kuota Tanggal Sudah Penuh!",
                            {
                                position: "top-right",
                                duration: 3000,
                            }
                        );
                    }

                    validation.value = error.response.data;
                });
        }
        var test = JSON.parse(localStorage.getItem("data"));
        order.full_name = test.data.name;
        order.whatsapp_num = test.data.whatsapp_num;
        order.email = test.data.email;

        return {
            pricings,
            validation,
            router,
            order,
            getPricingPrice,
            makeOrder,
        };
    },
};
</script>

<template>
    <!-- Navbar -->
    <Navbar />
    <div class="container py-4">
        <main>
            <div class="py-5 text-center">
                <!-- <img
                    class="d-block mx-auto mb-4"
                    src="../assets/brand/bootstrap-logo.svg"
                    alt=""
                    width="72"
                    height="57"
                /> -->
                <h2>Order form</h2>
                <p class="lead">
                    Below is an example form built entirely with Bootstrap’s
                    form controls. Each required form group has a validation
                    state that can be triggered by attempting to submit the form
                    without completing it.
                </p>
            </div>

            <div class="row g-5">
                <div class="col-md-5 col-lg-4 order-md-last">
                    <h4
                        class="
                            d-flex
                            justify-content-between
                            align-items-center
                            mb-3
                        "
                    >
                        <span class="text-primary">Your cart</span>
                        <span class="badge bg-primary rounded-pill"></span>
                    </h4>
                    <ul class="list-group mb-3">
                        <li
                            class="
                                list-group-item
                                d-flex
                                justify-content-between
                                lh-sm
                            "
                        >
                            <div>
                                <h6 class="my-0">{{ order.pricing_name }}</h6>
                                <small class="text-muted">{{
                                    order.pricing_type
                                }}</small>
                            </div>
                            <span class="text-muted"
                                >Rp {{ order.total_price }}</span
                            >
                        </li>

                        <li
                            class="
                                list-group-item
                                d-flex
                                justify-content-between
                            "
                        >
                            <span>Total (Rp)</span>
                            <strong>{{ order.total_price }}</strong>
                        </li>
                    </ul>
                </div>
                <div class="col-md-7 col-lg-8">
                    <h4 class="mb-3">Billing address</h4>
                    <form
                        class="needs-validation"
                        novalidate
                        @submit.prevent="makeOrder"
                    >
                        <div class="row g-3">
                            <div class="col-sm-6">
                                <label for="Name" class="form-label"
                                    >Name</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Name"
                                    placeholder=""
                                    required
                                    v-model="order.full_name"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validation.full_name"
                                >
                                    {{ validation.full_name[0] }}
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <label for="WhatsApp" class="form-label"
                                    >WhatsApp Number</label
                                >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="WhatsApp"
                                    required
                                    v-model="order.whatsapp_num"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validation.whatsapp_num"
                                >
                                    {{ validation.whatsapp_num[0] }}
                                </div>
                            </div>

                            <div class="col-12">
                                <label for="email" class="form-label"
                                    >Email
                                    <span class="text-muted"
                                        >(Optional)</span
                                    ></label
                                >
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    placeholder="you@example.com"
                                />
                                <div class="text-danger">
                                    Please enter a valid email address for
                                    shipping updates.
                                </div>
                            </div>

                            <div class="col-12">
                                <label for="address" class="form-label"
                                    >Address</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="address"
                                    placeholder="1234 Main St"
                                    required
                                    v-model="order.address"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validation.address"
                                >
                                    {{ validation.address[0] }}
                                </div>
                            </div>
                            <h4 class="mb-3">Event Information</h4>
                            <div class="col-12">
                                <label for="venue" class="form-label"
                                    >Venue
                                    <span class="text-muted"
                                        >(Optional)</span
                                    ></label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="venue"
                                    placeholder="Apartment or suite"
                                    v-model="order.location"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validation.location"
                                >
                                    {{ validation.location[0] }}
                                </div>
                            </div>

                            <div class="col-md-5">
                                <label for="date" class="form-label"
                                    >Date</label
                                >
                                <input
                                    type="date"
                                    class="form-control"
                                    id="date"
                                    v-model="order.date"
                                />
                                <div class="text-danger" v-if="validation.date">
                                    {{ validation.date[0] }}
                                </div>
                            </div>

                            <div class="col-md-7">
                                <label for="pricing" class="form-label"
                                    >Pricing</label
                                >
                                <select
                                    class="form-select"
                                    id="pricing"
                                    required
                                    v-model="order.pricing_id"
                                    @change="getPricingPrice()"
                                >
                                    <option value="" disabled selected hidden>
                                        Choose...
                                    </option>
                                    <option
                                        v-for="(pricing, index) in pricings"
                                        :key="index"
                                        :value="pricing.id"
                                    >
                                        {{ pricing.pricing_name }}
                                    </option>
                                </select>
                            </div>

                            <!-- <div class="col-md-3">
                                <label for="zip" class="form-label">Zip</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="zip"
                                    placeholder=""
                                    required
                                />
                                <div class="text-danger">
                                    Zip code required.
                                </div>
                            </div> -->
                        </div>

                        <hr class="my-4" />

                        <button
                            class="w-100 btn btn-primary btn-lg"
                            type="submit"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<style scoped>
.container {
    max-width: 960px;
}
</style>