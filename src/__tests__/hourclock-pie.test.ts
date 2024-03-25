import { mount } from "@vue/test-utils";
import { vi, describe, it, expect } from "vitest";
import HourclockPie from "./../HourclockPie.vue";

const valid = [
  {
    data: [
      {
        label: "top of the hour jingle",
        value: 1 * 60,
        color: "#ff0000",
      },
    ],
  },
];

describe("hourclock", () => {
  describe("pie", () => {
    it.each(valid)("should render %s", (props) => {
      const warnMock = vi.spyOn(console, "warn");

      const wrapper = mount(HourclockPie, {
        props: props,
      });

      expect(warnMock).toHaveBeenCalledTimes(0);
      expect(wrapper.html()).toMatchSnapshot();

      warnMock.mockRestore();
    });
  });
});
