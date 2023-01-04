<script>
import Navbar from "../components/Navbar.vue";

import axios from "axios";
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";

export default {
    components: {
        Navbar,
    },
    setup() {
        const route = useRoute();

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
                .get(`http://127.0.0.1:8080/api/orders/${route.params.id}`)
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
                });
        });

        function print() {
            window.print();
        }

        return {
            print,
            route,
            x,
        };
    },
};
</script>

<template>
    <!-- Navbar -->
    <Navbar />
    <div class="container">
        <div class="card">
            <div class="card-body">
                <div id="invoice">
                    <div class="toolbar hidden-print">
                        <div class="text-end">
                            <button
                                type="button"
                                class="btn btn-danger"
                                @click.prevent="print"
                            >
                                <i class="fa fa-file-pdf-o"></i> Print
                            </button>
                        </div>
                        <hr />
                    </div>
                    <div class="invoice overflow-auto">
                        <div style="min-width: 600px">
                            <header>
                                <div class="row">
                                    <div class="col">
                                        <h1>Heroe Photography</h1>
                                    </div>
                                    <div class="col company-details">
                                        <h2 class="name">
                                            <router-link
                                                :to="{ name: 'home' }"
                                                target="_blank"
                                            >
                                                Heroe Photography
                                            </router-link>
                                        </h2>
                                        <div>Jl. Ngagel Timur/15, Surabaya</div>
                                        <div>(123) 456-789</div>
                                        <div>company@example.com</div>
                                    </div>
                                </div>
                            </header>
                            <main>
                                <div class="row contacts">
                                    <div class="col invoice-to">
                                        <div class="text-gray-light">
                                            INVOICE TO:
                                        </div>
                                        <h2 class="to">{{ x.full_name }}</h2>
                                        <div class="address">
                                            {{ x.address }}
                                        </div>
                                        <div class="email">
                                            john@example.com
                                        </div>
                                    </div>
                                    <div class="col invoice-details">
                                        <h1 class="invoice-id">
                                            INVOICE {{ x.id }}
                                        </h1>
                                        <div class="date">
                                            Date of Invoice: {{ x.created_at }}
                                        </div>
                                        <div class="date">
                                            Due Date: 30/10/2018
                                        </div>
                                    </div>
                                </div>
                                <table class="text-center">
                                    <thead>
                                        <tr>
                                            <th>Event Date</th>
                                            <th>Pricing Name</th>
                                            <th>Pricing Type</th>
                                            <th>Payment Status</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="no">{{ x.date }}</td>
                                            <td>
                                                <h3>
                                                    {{ x.pricing_name }}
                                                </h3>
                                            </td>
                                            <td class="unit">
                                                {{ x.pricing_type }}
                                            </td>
                                            <td class="qty">
                                                {{ x.payment_status }}
                                            </td>
                                            <td class="total">
                                                Rp {{ x.total_price }}
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2"></td>
                                            <td colspan="2">GRAND TOTAL</td>
                                            <td>Rp {{ x.total_price }}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div class="thanks">Thank you!</div>
                                <div class="notices">
                                    <div>NOTES:</div>
                                    <div class="notice">
                                        <!-- A finance charge of 1.5% will be made on
                                        unpaid balances after 30 days. -->
                                        Client Information <br />
                                        Nama : {{ x.full_name }} <br />
                                        WhatsApp : {{ x.whatsapp_num }} <br />
                                        address : {{ x.address }} <br />
                                        <br />

                                        Event Information <br />
                                        Venue : {{ x.location }} <br />
                                        Date : {{ x.date }} <br />
                                        Price : {{ x.total_price }} <br />
                                        Payment Status : {{ x.payment_status }}
                                    </div>
                                </div>
                            </main>
                            <footer>
                                Invoice was created on a computer and is valid
                                without the signature and seal.
                            </footer>
                        </div>
                        <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom-->
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    margin-top: 20px;
    background-color: #f7f7ff;
}

.navbar {
    visibility: hidden;
}

#invoice {
    padding: 0px;
}

.invoice {
    position: relative;
    background-color: #fff;
    min-height: 680px;
    padding: 15px;
}

.invoice header {
    padding: 10px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #0d6efd;
}

.invoice .company-details {
    text-align: right;
}

.invoice .company-details .name {
    margin-top: 0;
    margin-bottom: 0;
}

.invoice .contacts {
    margin-bottom: 20px;
}

.invoice .invoice-to {
    text-align: left;
}

.invoice .invoice-to .to {
    margin-top: 0;
    margin-bottom: 0;
}

.invoice .invoice-details {
    text-align: right;
}

.invoice .invoice-details .invoice-id {
    margin-top: 0;
    color: #0d6efd;
}

.invoice main {
    padding-bottom: 50px;
}

.invoice main .thanks {
    margin-left: 10px;
    margin-top: -75px;
    font-size: 2em;
    margin-bottom: 50px;
}

.invoice main .notices {
    padding-left: 6px;
    border-left: 6px solid #0d6efd;
    background: #e7f2ff;
    padding: 10px;
}

.invoice main .notices .notice {
    font-size: 1.2em;
}

.invoice table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 20px;
}

.invoice table td,
.invoice table th {
    padding: 15px;
    background: #eee;
    border-bottom: 1px solid #fff;
}

.invoice table th {
    white-space: nowrap;
    font-weight: 400;
    font-size: 16px;
}

.invoice table td h3 {
    margin: 0;
    font-weight: 400;
    /* color: #0d6efd; */
    font-size: 1.2em;
}

.invoice table .qty,
.invoice table .total,
.invoice table .unit {
    /* text-align: right; */
    font-size: 1.2em;
}

.invoice table .no {
    /* color: #fff; */
    font-size: 1.6em;
    /* background: #0d6efd; */
}

.invoice table .unit {
    background: #ddd;
}

/* .invoice table .total {
    background: #0d6efd;
    color: #fff;
} */

.invoice table tbody tr:last-child td {
    border: none;
}

.invoice table tfoot td {
    background: 0 0;
    border-bottom: none;
    white-space: nowrap;
    text-align: right;
    padding: 10px 20px;
    font-size: 1.2em;
    border-top: 1px solid #aaa;
}

.invoice table tfoot tr:first-child td {
    border-top: none;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0px solid rgba(0, 0, 0, 0);
    border-radius: 0.25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%),
        0 2px 6px 0 rgb(206 206 238 / 54%);
}

.invoice table tfoot tr:last-child td {
    color: #0d6efd;
    font-size: 1.4em;
    border-top: 1px solid #0d6efd;
}

.invoice table tfoot tr td:first-child {
    border: none;
}

.invoice footer {
    width: 100%;
    text-align: center;
    color: #777;
    border-top: 1px solid #aaa;
    padding: 8px 0;
}

@media print {
    body * {
        visibility: hidden;
    }
    .invoice,
    .invoice * {
        visibility: visible;
    }
    .invoice {
        position: absolute;
        left: 0;
        top: 0;
    }
    .invoice {
        font-size: 11px !important;
        overflow: hidden !important;
    }

    .invoice footer {
        position: absolute;
        bottom: 10px;
        page-break-after: always;
    }
    .invoice > div:last-child {
        page-break-before: always;
    }
}

.invoice main .notices {
    padding-left: 6px;
    border-left: 6px solid #0d6efd;
    background: #e7f2ff;
    padding: 10px;
}
</style>