import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Carousel = () => (
    <div
        style={{
            background: "#4799d6",
            backgroundImage: "url(../../images/images/cdf/cdf-background-wide.jpg)",
            backgroundSize: "cover",
            margin: "2rem 0rem",
            padding: 56,
        }}
    >
        <Swiper
            spaceBetween={36}
            slidesPerView={1}
            pagination={true}
            modules={[Autoplay, Navigation, Pagination]}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: true,
            }}
            style={{
                "--swiper-pagination-color": "#FFFFFF",
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "8px",
                "--swiper-pagination-bullet-horizontal-gap": "8px",
            }}
        >
            <SwiperSlide>
                <div>
                    <a href={"/"}>
                        <div
                            style={{
                                display: "flex",
                                gap: "32px",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "16px",
                            }}
                        >
                            <div style={{ color: "#FFFFFF" }}>
                                <h2 className="legend">Welcome to GSoC 2023!</h2>
                                <p>
                                    Google Summer of Code 2023 includes 4 Jenkins projects.
                                    Congratulations to the selected GSoC contributors.
                                </p>
                                <p>
                                    Jenkins is a community-driven project. We invite everyone to
                                    join us and move it forward. Any contribution matters: code,
                                    documentation, localization, blog posts, artwork, meetups, and
                                    anything else. If you have five minutes or a few hours, you can
                                    help!
                                </p>
                            </div>
                            <div>
                                <img
                                    src="../../images/images/gsoc/gsoc_projects_contributors_selected.png"
                                    alt={"GSoC selected contributor"}
                                    style={{ height: "320px", maxWidth: "unset" }}
                                />
                            </div>
                        </div>
                    </a>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div>
                    <a href="/">
                        <div
                            style={{
                                display: "flex",
                                gap: "32px",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "16px",
                            }}
                        >
                            <div style={{ color: "#FFFFFF" }}>
                                <h2 className="legend">Welcome to GSoC 2023!</h2>
                                <p>
                                    Google Summer of Code 2023 includes 4 Jenkins projects.
                                    Congratulations to the selected GSoC contributors.
                                </p>
                                <p>
                                    Jenkins is a community-driven project. We invite everyone to
                                    join us and move it forward. Any contribution matters: code,
                                    documentation, localization, blog posts, artwork, meetups, and
                                    anything else. If you have five minutes or a few hours, you can
                                    help!
                                </p>
                            </div>
                            <div>
                                <img
                                    src="../../images/images/gsoc/gsoc_projects_contributors_selected.png"
                                    alt={"GSoC selected contributor"}
                                    style={{ height: "320px", maxWidth: "unset" }}
                                />
                            </div>
                        </div>
                    </a>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div>
                    <a href="/">
                        <div
                            style={{
                                display: "flex",
                                gap: "32px",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "16px",
                            }}
                        >
                            <div style={{ color: "#FFFFFF" }}>
                                <h2 className="legend">Welcome to GSoC 2023!</h2>
                                <p>
                                    Google Summer of Code 2023 includes 4 Jenkins projects.
                                    Congratulations to the selected GSoC contributors.
                                </p>
                                <p>
                                    Jenkins is a community-driven project. We invite everyone to
                                    join us and move it forward. Any contribution matters: code,
                                    documentation, localization, blog posts, artwork, meetups, and
                                    anything else. If you have five minutes or a few hours, you can
                                    help!
                                </p>
                            </div>
                            <div>
                                <img
                                    src="../../images/images/gsoc/gsoc_projects_contributors_selected.png"
                                    alt={"GSoC selected contributor"}
                                    style={{ height: "320px", maxWidth: "unset" }}
                                />
                            </div>
                        </div>
                    </a>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
);

export default Carousel;
