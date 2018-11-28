const db = require('../database/config');

exports.Admin = async (ctx) => {
  const adminViewModel = {
    title: 'Admin page',
    skills: db.get('skills').value(),
    msgskill: ctx.flash.msgskill,
    msgfile: ctx.flash.msgfile
  };
  await ctx.render('pages/admin', adminViewModel);
};

exports.AddProduct = async (ctx) => {
  const newProduct = {
    src: `./assets/img/products/${ctx.req.file.filename}`,
    name: ctx.req.body.name,
    price: parseInt(ctx.req.body.price)
  };

  db.get('products')
    .push(newProduct)
    .write();

  ctx.flash = { msgfile: 'Product successfully created!' };
  await ctx.redirect('/admin');
};

exports.AddSkills = async (ctx) => {
  const skills = [
    { name: 'age', value: parseInt(ctx.request.body.age) || 0 },
    { name: 'concerts', value: parseInt(ctx.request.body.concerts) || 0 },
    { name: 'cities', value: parseInt(ctx.request.body.cities) || 0 },
    { name: 'year', value: parseInt(ctx.request.body.years) || 0 }
  ];
  skills.forEach(skill => {
    db.get('skills')
      .find({ name: skill.name })
      .assign({ value: skill.value })
      .write();
  });
  ctx.flash = { msgskill: 'Skill values successfully updated!' };
  await ctx.redirect('/admin');
};
