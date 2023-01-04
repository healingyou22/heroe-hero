<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

import axios from "axios";
import { onMounted, ref } from "vue";

export default {
    components: {
        Navbar,
        Footer,
    },
    setup() {
        let info = null;
        let info2 = ref([]);

        onMounted(() => {
            axios
                .get("http://127.0.0.1:8080/api/galleries")
                .then((result) => {
                    info = result.data;

                    info2.value = info.data.reduce((group, product) => {
                        const { title } = product;
                        const title2 = title.split(" ").shift().toLowerCase();
                        group[title2] = group[title2] ?? [];
                        group[title2].push(product);
                        return group;
                    }, {});

                    console.log(info2);
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        return {
            info,
            info2,
        };
    },
};
</script>

<template>
    <!-- Navbar -->
    <Navbar />

    <main>
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Our Gallery</h1>
                    <p class="lead text-muted">
                        Something short and leading about the collection
                        below—its contents, the creator, etc. Make it short and
                        sweet, but not too short so folks don’t simply skip over
                        it entirely.
                    </p>
                </div>
            </div>

            <ul
                class="nav nav-pills mb-3 justify-content-center"
                id="pills-tab"
                role="tablist"
            >
                <li class="nav-item" role="presentation">
                    <button
                        class="nav-link active"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                    >
                        Wedding
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button
                        class="nav-link"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                    >
                        Prewedding
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button
                        class="nav-link"
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                    >
                        Akad Nikah
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button
                        class="nav-link"
                        id="pills-disabled-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-disabled"
                        type="button"
                        role="tab"
                        aria-controls="pills-disabled"
                        aria-selected="false"
                    >
                        Lamaran
                    </button>
                </li>
            </ul>

            <section v-if="errored">
                <p>
                    We're sorry, we're not able to retrieve this information at
                    the moment, please try back later
                </p>
            </section>

            <section v-else>
                <div v-if="loading">Loading...</div>

                <div class="tab-content album py-5" id="pills-tabContent">
                    <div
                        class="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                        tabindex="0"
                    >
                        <div
                            class="
                                row row-cols-1 row-cols-sm-2 row-cols-md-3
                                g-3
                            "
                        >
                            <div
                                class="col"
                                v-for="(image, index) in info2.wedding"
                                :key="index"
                            >
                                <div class="card shadow-sm">
                                    <img
                                        :src="image.image"
                                        alt=""
                                        lass="bd-placeholder-img card-img-top"
                                        xmlns="http://www.w3.org/2000/svg"
                                        role="img"
                                        aria-label="Placeholder: Thumbnail"
                                        preserveAspectRatio="xMidYMid slice"
                                        focusable="false"
                                    />

                                    <div class="card-body">
                                        <p class="card-text">
                                            {{ image.title }}
                                        </p>
                                        <div
                                            class="
                                                d-flex
                                                justify-content-between
                                                align-items-center
                                            "
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                        tabindex="0"
                    >
                        <div
                            class="
                                row row-cols-1 row-cols-sm-2 row-cols-md-3
                                g-3
                            "
                        >
                            <div
                                class="col"
                                v-for="(image, index) in info2.prewedding"
                                :key="index"
                            >
                                <div class="card shadow-sm">
                                    <img
                                        :src="image.image"
                                        alt=""
                                        lass="bd-placeholder-img card-img-top"
                                        xmlns="http://www.w3.org/2000/svg"
                                        role="img"
                                        aria-label="Placeholder: Thumbnail"
                                        preserveAspectRatio="xMidYMid slice"
                                        focusable="false"
                                    />

                                    <div class="card-body">
                                        <p class="card-text">
                                            {{ image.title }}
                                        </p>
                                        <div
                                            class="
                                                d-flex
                                                justify-content-between
                                                align-items-center
                                            "
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="tab-pane fade"
                        id="pills-contact"
                        role="tabpanel"
                        aria-labelledby="pills-contact-tab"
                        tabindex="0"
                    >
                        <div
                            class="
                                row row-cols-1 row-cols-sm-2 row-cols-md-3
                                g-3
                            "
                        >
                            <div
                                class="col"
                                v-for="(image, index) in info2.akad"
                                :key="index"
                            >
                                <div class="card shadow-sm">
                                    <img
                                        :src="image.image"
                                        alt=""
                                        lass="bd-placeholder-img card-img-top"
                                        xmlns="http://www.w3.org/2000/svg"
                                        role="img"
                                        aria-label="Placeholder: Thumbnail"
                                        preserveAspectRatio="xMidYMid slice"
                                        focusable="false"
                                    />

                                    <div class="card-body">
                                        <p class="card-text">
                                            {{ image.title }}
                                        </p>
                                        <div
                                            class="
                                                d-flex
                                                justify-content-between
                                                align-items-center
                                            "
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="tab-pane fade"
                        id="pills-disabled"
                        role="tabpanel"
                        aria-labelledby="pills-disabled-tab"
                        tabindex="0"
                    >
                        <div
                            class="
                                row row-cols-1 row-cols-sm-2 row-cols-md-3
                                g-3
                            "
                        >
                            <div
                                class="col"
                                v-for="(image, index) in info2.lamaran"
                                :key="index"
                            >
                                <div class="card shadow-sm">
                                    <img
                                        :src="image.image"
                                        alt=""
                                        lass="bd-placeholder-img card-img-top"
                                        xmlns="http://www.w3.org/2000/svg"
                                        role="img"
                                        aria-label="Placeholder: Thumbnail"
                                        preserveAspectRatio="xMidYMid slice"
                                        focusable="false"
                                    />

                                    <div class="card-body">
                                        <p class="card-text">
                                            {{ image.title }}
                                        </p>
                                        <div
                                            class="
                                                d-flex
                                                justify-content-between
                                                align-items-center
                                            "
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </main>

    <!-- Footer -->
    <Footer />
</template>