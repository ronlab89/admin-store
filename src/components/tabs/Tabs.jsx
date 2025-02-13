import React, { Children, useState } from "react";

const Tabs = ({ tabs, content }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <>
      <article className="mb-4 border-b-2 border-slate-200 dark:border-slate-800">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id={activeTab}
          data-tabs-toggle={`#${activeTab}`}
          role="tablist"
        >
          {tabs.map((item) => (
            <li key={item.id} className="me-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 !rounded-none
                        ${
                          activeTab === item?.id
                            ? "text-teal-600 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-400 border-teal-600 dark:border-teal-400"
                            : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                        }
                        `}
                id={item.id}
                data-tabs-target={`#${item.id}`}
                type="button"
                role="tab"
                onClick={() => setActiveTab(item.id)}
                aria-controls={item.id}
                aria-selected={activeTab === item.id}
              >
                {item?.title}
              </button>
            </li>
          ))}
        </ul>
      </article>

      {/* Content */}
      <article>
        {content
          .filter((tabContent) => tabContent.id === activeTab)
          .map((tabContent) => (
            <React.Fragment key={tabContent.id}>
              {tabContent.content}
            </React.Fragment>
          ))}
      </article>
    </>
  );
};

export default Tabs;
