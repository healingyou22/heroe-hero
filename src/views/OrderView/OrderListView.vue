<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";

import { onMounted, ref, reactive } from "vue";
import axios from "axios";

export default {
    components: {
        Navbar,
        Footer,
    },
    setup() {
        let orders = ref([]);

        const x = reactive({
            pricing_name: "",
            full_name: "",
            address: "",
            whatsapp_num: "",
            date: "",
            location: "",
            total_price: "",
            id: "",
            snap_token: "",
            payment_status: "",
            order_status: "",
            pricing_type: "",
            created_at: "",
        });

        onMounted(() => {
            axios
                .get(`http://127.0.0.1:8080/api/orders-list`)
                .then((result) => {
                    orders.value = result.data.data;
                })
                .catch((err) => {
                    err.response;
                });
        });

        function getId(id) {
            axios
                .get(`http://127.0.0.1:8080/api/orders/${id}`)
                .then((result) => {
                    x.pricing_name = result.data.data.pricing.pricing_name;
                    x.full_name = result.data.data.full_name;
                    x.location = result.data.data.location;
                    x.date = result.data.data.date;
                    x.whatsapp_num = result.data.data.whatsapp_num;
                    x.address = result.data.data.address;
                    x.total_price = result.data.data.total_price;
                    x.id = result.data.data.id;
                    x.snap_token = result.data.data.snap_token;
                    x.payment_status = result.data.data.payment_status;
                    x.order_status = result.data.data.order_status;
                    x.pricing_type = result.data.data.pricing.pricing_type;
                    x.created_at = result.data.data.created_at.slice(0, 10);
                })
                .catch((err) => {
                    err.response;
                });
        }

        function pay(snap_token) {
            snap.pay(snap_token, {
                onSuccess: function (result) {
                    console.log(result);
                },
                onPending: function (result) {
                    console.log(result);
                },
                onError: function (result) {
                    console.log(result);
                },
                onClose: function () {
                    return snap.hide();
                },
            });
        }

        return {
            orders,
            getId,
            x,
            pay,
        };
    },
};
</script>

<template>
    <!-- Navbar -->
    <Navbar />
    <main>
        <div class="container py-5">
            <h2 class="mt-4">Order List</h2>

            <div class="row mb-3">
                <div class="col-md-8">
                    <div
                        class="col-md-12"
                        v-for="(order, index) in orders"
                        :key="index"
                    >
                        <div class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img
                                        src="/images/service-3.jpg"
                                        class="img-fluid rounded-start"
                                        alt="..."
                                    />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            {{ order.date }} |
                                            {{ order.payment_status }}
                                        </h5>
                                        <p class="card-text">
                                            {{ order.pricing.pricing_name }} |
                                            {{ order.location }} |
                                            {{ order.order_status }}
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted"
                                                >Total Price :
                                                <b
                                                    >Rp
                                                    {{ order.total_price }}</b
                                                >
                                            </small>
                                        </p>
                                        <div
                                            class="
                                                d-grid
                                                gap-2
                                                d-md-flex
                                                justify-content-md-end
                                            "
                                        >
                                            <button
                                                class="
                                                    btn btn-outline-dark
                                                    me-md-2
                                                "
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                @click="getId(order.id)"
                                            >
                                                Show Detail
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-primary"
                                                v-if="
                                                    order.payment_status ==
                                                    'Pending'
                                                "
                                                @click="pay(order.snap_token)"
                                            >
                                                Pay
                                            </button>
                                            <!-- <button
                                                type="button"
                                                class="btn btn-primary"
                                                v-else
                                                disabled
                                            >
                                                {{ order.payment_status }}
                                            </button> -->
                                            <router-link
                                                :to="{
                                                    name: 'invoice',
                                                    params: { id: order.id },
                                                }"
                                                class="btn btn-success"
                                                target="_blank"
                                                v-else-if="
                                                    order.payment_status !==
                                                    'Canceled'
                                                "
                                                >Invoice</router-link
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card text-center" style="width: 18rem">
                    <div class="card-body">
                        <h5 class="card-title">Butuh Bantuan?</h5>

                        <a href="#" class="btn btn-primary">Hubungi Penjual</a>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </main>

    <!-- Modal -->
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div
            class="
                modal-dialog
                modal-lg
                modal-dialog-centered
                modal-dialog-scrollable
            "
        >
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Order Detail
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row first">
                            <div class="row">
                                <div class="col">
                                    <b>{{ x.order_status }}</b>
                                </div>
                                <div class="col-6"></div>
                                <div class="col"></div>
                            </div>
                            <div class="row">
                                <div class="col">No. Invoice</div>
                                <div class="col-6"></div>
                                <div class="col">{{ x.id }}</div>
                            </div>
                            <div class="row">
                                <div class="col">Tanggal Pemesanan</div>
                                <div class="col-6"></div>
                                <div class="col">{{ x.created_at }}</div>
                            </div>
                        </div>
                        <hr />
                        <div class="row second">
                            <div class="row">
                                <div class="col"><b>Detail Produk</b></div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="card mb-2">
                                        <div class="row g-0">
                                            <div class="col-md-4">
                                                <img
                                                    src="/images/service-1.jpg"
                                                    class="
                                                        img-fluid
                                                        rounded-start
                                                    "
                                                    alt="..."
                                                />
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body">
                                                    <h5 class="card-title">
                                                        {{ x.pricing_name }}
                                                    </h5>
                                                    <p class="card-text">
                                                        {{ x.pricing_type }}
                                                    </p>
                                                    <router-link
                                                        :to="{ name: 'order' }"
                                                        class="
                                                            btn
                                                            btn-outline-primary
                                                            btn-detail
                                                        "
                                                        >Order</router-link
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row last">
                            <div class="row">
                                <div class="col"><b>Info Pemesanan</b></div>
                                <div class="col"></div>
                                <div class="col-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-3">Nama</div>
                                <div class="col-md-auto">:</div>
                                <div class="col-6">{{ x.full_name }}</div>
                            </div>
                            <div class="row">
                                <div class="col-3">WhatsApp</div>
                                <div class="col-md-auto">:</div>
                                <div class="col-6">{{ x.whatsapp_num }}</div>
                            </div>
                            <div class="row">
                                <div class="col-3">Address</div>
                                <div class="col-md-auto">:</div>
                                <div class="col-6">{{ x.address }}</div>
                            </div>
                            <div class="row">
                                <div class="col-3">Venue</div>
                                <div class="col-md-auto">:</div>
                                <div class="col-6">{{ x.location }}</div>
                            </div>
                            <div class="row">
                                <div class="col-3">Date</div>
                                <div class="col-md-auto">:</div>
                                <div class="col-6">{{ x.date }}</div>
                            </div>
                            <div class="row">
                                <div class="col-3">Price</div>
                                <div class="col-md-auto">:</div>
                                <div class="col-6">{{ x.total_price }}</div>
                            </div>
                            <div class="row">
                                <div class="col-3">Payment Status</div>
                                <div class="col-md-auto">:</div>
                                <div class="col-6">{{ x.payment_status }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        v-if="x.payment_status == 'Pending'"
                        @click.prevent="pay(x.snap_token)"
                    >
                        Pay
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.themed-grid-col {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background-color: rgba(86, 61, 124, 0.15);
    border: 1px solid rgba(86, 61, 124, 0.2);
}

.btn-detail {
    float: right;
}
</style>