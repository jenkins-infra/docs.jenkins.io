import React, { useCallback, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Seo from "../../components/Seo";
import PageName from "../../components/PageName";
import IndexPageLayout from "../../layouts";
import "../../css/roadmap.css";
import { graphql } from "gatsby";

const Roadmap = ({ data }) => {
    const [filters, setFilters] = useState([]);

    const toggleFilter = useCallback(
        (filterId) => {
            if (filters.includes(filterId)) {
                setFilters(filters.filter((id) => id !== filterId));
            } else {
                setFilters([...filters, filterId]);
            }
        },
        [filters],
    );

    const filterRoadmap = useCallback(() => {
        var selectors = document.getElementsByClassName("initiative-selector");
        var filters = [];
        var filterInitiatives = false;
        for (var i = 0; i < selectors.length; i++) {
            var selector = selectors[i];
            if (selector.checked === true) {
                filters.push(selector.id);
                filterInitiatives = true;
            }
        }

        var categoryHeaders = document.getElementsByClassName("status-category");
        var categoryInitiatives = document.getElementsByClassName("category-initiatives");

        for (var categoryId = 0; categoryId < categoryInitiatives.length; categoryId++) {
            var initiatives = categoryInitiatives[categoryId].getElementsByClassName("initiative");
            var hasInitiativesToDisplay = false;

            for (var j = 0; j < initiatives.length; j++) {
                // stores all the tasks in every category
                var initiative = initiatives[j];
                var display = !filterInitiatives;
                for (var k = 0; k < filters.length; k++) {
                    if (initiative.classList.contains(filters[k])) {
                        display = true;
                        break;
                    }
                }
                if (display) {
                    hasInitiativesToDisplay = true;
                    initiative.style.display = "";
                } else {
                    initiative.style.display = "none";
                }
            }

            if (hasInitiativesToDisplay) {
                categoryHeaders[categoryId].style.display = "";
            } else {
                categoryHeaders[categoryId].style.display = "none";
            }
        }
    }, [filters]);

    useEffect(() => {
        // Initialize tooltips for MUI
        const tooltipTriggerList = document.querySelectorAll('[data-mui-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new Tooltip(tooltipTriggerEl, {
                placement: "top",
                title: tooltipTriggerEl.getAttribute("title"),
            });
        });

        filterRoadmap();
    }, [filterRoadmap]);

    return (
        <IndexPageLayout>
            <Seo title="Jenkins Roadmap" />
            <PageName title={"Jenkins Roadmap"} />
            <p>
                Jenkins project offers a public community-driven roadmap. It aggregates key
                initiatives in all areas: features, infrastructure, documentation, community, etc.
                See <a href="https://github.com/jenkinsci/jep/tree/master/jep/14">JEP-14</a> for
                more information about the public roadmap process. We do NOT commit on delivery
                dates, all initiatives depend on contributions. Anyone is welcome to participate and
                help us to deliver the initiatives below!{" "}
                <a href="https://www.jenkins.io/participate/">Contributing to Jenkins</a>
            </p>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <p>Filters:</p>
                {data.allRoadmapsYaml.edges[1].node.labels.map((label) => (
                    <div key={label.displayName}>
                        <label>
                            <input
                                type="checkbox"
                                className="initiative-selector"
                                id={`initiative-label-${label.name}`}
                                // onClick={filterRoadmap}
                                onClick={() => toggleFilter(label.name)}
                            />
                            {"  " + label.displayName}
                        </label>
                    </div>
                ))}
            </div>

            <table className="roadmap-table">
                <thead>
                    <tr>
                        {data.allRoadmapsYaml.edges[1].node.statuses.map((status) =>
                            status.hide ? null : <th key={status.id}>{status.displayName}</th>,
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.allRoadmapsYaml.edges[1].node.categories.map((category) => (
                        <React.Fragment key={category.name}>
                            <tr className="status-category">
                                <td colSpan="5" className="cat-name">
                                    <span>{category.name}</span>
                                </td>
                            </tr>
                            <tr className="category-initiatives">
                                {data.allRoadmapsYaml.edges[1].node.statuses.map((status) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <td
                                        className={`status ${status.id}`}
                                        data-header={status.displayName}
                                    >
                                        {category.initiatives.map((initiative) => {
                                            let labelClasses = "";

                                            if (initiative.labels) {
                                                initiative.labels.forEach((label) => {
                                                    labelClasses += ` initiative-label-${label}`;
                                                });
                                            }
                                            return (
                                                initiative.status === status.id && (
                                                    <div
                                                        key={initiative.name}
                                                        className={`status initiative ${status.id} ${labelClasses}`}
                                                    >
                                                        <Tooltip
                                                            title={
                                                                initiative.description
                                                                    ? initiative.description
                                                                    : status.description
                                                            }
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <a
                                                                href={
                                                                    initiative.link
                                                                        ? initiative.link
                                                                        : category.link
                                                                }
                                                            >
                                                                {initiative.name}
                                                            </a>
                                                        </Tooltip>
                                                    </div>
                                                )
                                            );
                                        })}
                                    </td>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <h2>References</h2>
            <ul>
                <li>
                    <a href="https://github.com/jenkinsci/jep/tree/master/jep/14">
                        Roadmap process documentation (JEP-14)
                    </a>
                </li>
                <li>
                    <a href="https://github.com/jenkinsci/jep/tree/master/jep/14#submitting-roadmap-suggestions">
                        HOWTO: Suggest a new roadmap item
                    </a>
                </li>
                <li>
                    <a href="https://github.com/jenkins-infra/jenkins.io/blob/master/content/_data/roadmap/roadmap.yml">
                        Open data (roadmap.yml)
                    </a>
                </li>
                <li>
                    <a href="https://github.com/jenkins-infra/jenkins.io/blob/master/content/_data/roadmap/archive.yml">
                        Archive (completed and withdrawn roadmap items)
                    </a>
                </li>
            </ul>
        </IndexPageLayout>
    );
};

export const Head = () => <Seo title="Jenkins Roadmap" />;

export default Roadmap;

export const query = graphql`
    {
        allRoadmapsYaml {
            edges {
                node {
                    statuses {
                        id
                        description
                        displayName
                        hide
                    }
                    labels {
                        name
                        displayName
                        description
                        link
                    }
                    categories {
                        name
                        description
                        link
                        initiatives {
                            name
                            description
                            status
                            link
                            labels
                        }
                    }
                }
            }
        }
    }
`;
