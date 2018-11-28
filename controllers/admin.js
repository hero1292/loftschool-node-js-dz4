const db = require('../database/config');
const path = require('path');

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
    src: path.join('./assets/img/products', ctx.file.filename),
    name: ctx.request.body.name,
    price: parseInt(ctx.request.body.price)
  };

  db.get('products')
    .push(newProduct)
    .write();

  ctx.flash = {msgfile: 'Product successfully created!'};
  await ctx.redirect('/admin');
};

exports.AddSkills = async (ctx) => {
  const skills = [
    { name: 'age', value: parseInt(ctx.request.body.age) || 0 },
    { name: 'concerts', value: parseInt(ctx.request.body.concerts) || 0 },
    { name: 'cities', value: parseInt(ctx.request.body.cities) || 0 },
    { name: 'year', value: parseInt(ctx.request.body.year) || 0 }
  ];
  skills.forEach(skill => {
    db.get('skills')
      .find({ name: skill.name })
      .assign({ value: skill.value })
      .write();
  });
  ctx.flash = {msgskill: 'Skill values successfully updated!'};
  await ctx.redirect('/admin');
};
