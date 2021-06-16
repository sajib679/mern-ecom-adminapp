const createCategoryList = (catParams, options = []) => {
  for (const category of catParams) {
    options.push({
      value: category._id,
      name: category.name,
      slug: category.slug,
      parentId: category.parentId,
      type: category.type,
    });
    if (category.children.length > 0) {
      createCategoryList(category.children, options);
    }
  }
  return options;
};

export default createCategoryList;
