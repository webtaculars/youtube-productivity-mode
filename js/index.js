const blur = (key, value) => {
  document.documentElement.style.setProperty(
    `--blur-value-${key}`,
    `blur(${value})`
  );
};

blur("home", "10px");
