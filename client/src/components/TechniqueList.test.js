/* globals jest test expect */
import React from "react";
import { shallow } from "enzyme";

import TechniqueList from "./TechniqueList";
import * as utils from "../utils";

const createComponent = (techniques = [], onTechniqueClick = jest.fn(), onEditClick = jest.fn()) => {
  //must use dive because of material-ui
  return shallow(<TechniqueList techniques={techniques} onTechniqueClick={onTechniqueClick} onEditClick={onEditClick} />).dive();
};

test("renders without crashing", () => {
  const component = createComponent();
  expect(component.length).toBeTruthy();
});

test("Renders empty list if no techniques", () => {
  const component = createComponent();
  expect(component.children().length).toBe(0);
});

test("Renders an item for each technique", () => {
  const techniques = [
    {
      name: "technique1",
      type: "movement"
    },
    {
      name: "technique2",
      type: "movement"
    }
  ];
  const component = createComponent(techniques);
  expect(component.find(".technique-list__technique").length).toBe(techniques.length);
});

test("Renders a sub-list for each technique type", () => {
  const techniques = [
    {
      name: "technique1",
      type: "movement"
    },
    {
      name: "technique2",
      type: "movement"
    },
    {
      name: "technique2",
      type: "takedown"
    },
    {
      name: "technique2",
      type: "sub"
    },
    {
      name: "technique2",
      type: "sub"
    }
  ];
  const numberOfLists = Object.keys(utils.groupBy(techniques, "type")).length;
  const component = createComponent(techniques);
  expect(component.find(".technique-list__typelist").length).toBe(numberOfLists);
});

test("onTechniqueClick is called when technique is clicked", () => {
  const techniques = [
    {
      name: "technique1",
      type: "movement"
    },
    {
      name: "technique2",
      type: "movement"
    }
  ];
  const onTechniqueClick = jest.fn();
  const component = createComponent(techniques, onTechniqueClick);

  component
    .find(".technique-list__technique")
    .first()
    .simulate("click");

  expect(onTechniqueClick).toHaveBeenCalled();
});

test("onEditClick is called when edit button is clicked", () => {
  const techniques = [
    {
      name: "technique1",
      type: "movement"
    },
    {
      name: "technique2",
      type: "movement"
    }
  ];
  const onEditClick = jest.fn();
  const component = createComponent(techniques, undefined, onEditClick);

  component
    .find(".technique-list__technique-edit-button")
    .first()
    .simulate("click");

  expect(onEditClick).toHaveBeenCalled();
});
