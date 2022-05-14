import { mount } from "@vue/test-utils";
import HourclockPie from "./../hourclock-pie.vue";

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

const invalid = [{}];

describe("hourclock", () => {
  describe("pie", () => {
    it.each(valid)("should render %s", (props) => {
      const warnMock = jest.spyOn(console, "warn").mockImplementation();

      const wrapper = mount(HourclockPie, {
        props: props,
      });

      expect(warnMock).toHaveBeenCalledTimes(0);
      expect(wrapper.html()).toMatchSnapshot();

      warnMock.mockRestore();
    });
    it.each(invalid)("should not render %s", (props) => {
      const warnMock = jest.spyOn(console, "warn").mockImplementation();

      const wrapper = mount(HourclockPie, {
        props: props,
      });

      expect(warnMock).toHaveBeenCalled();
      expect(warnMock.mock.calls).toMatchSnapshot();
      expect(wrapper.html()).toMatch("<!--v-if-->");

      warnMock.mockRestore();
    });
  });
});
