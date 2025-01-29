# Generated by Django 5.1.4 on 2025-01-22 22:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auction', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bid',
            options={'ordering': ['-bid_time']},
        ),
        migrations.RemoveField(
            model_name='bid',
            name='bid_id',
        ),
        migrations.RemoveField(
            model_name='bid',
            name='product',
        ),
        migrations.AddField(
            model_name='bid',
            name='auction',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bids', to='auction.auction'),
        ),
        migrations.AddField(
            model_name='bid',
            name='id',
            field=models.BigAutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='auction',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='auctions', to='auction.product'),
        ),
        migrations.AlterField(
            model_name='auction',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('active', 'Active'), ('finished', 'Finished')], default='pending', max_length=10),
        ),
    ]
