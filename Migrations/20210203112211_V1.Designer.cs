﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using projekat.Models;

namespace projekat.Migrations
{
    [DbContext(typeof(TeniskiMecContext))]
    [Migration("20210203112211_V1")]
    partial class V1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("projekat.Models.Igrac", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<int>("Godine")
                        .HasColumnType("int")
                        .HasColumnName("Godine");

                    b.Property<string>("ImePrezime")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Ime i prezime");

                    b.Property<int>("Rang")
                        .HasColumnType("int")
                        .HasColumnName("Rang");

                    b.HasKey("ID");

                    b.ToTable("Igrac");
                });

            modelBuilder.Entity("projekat.Models.Mec", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<string>("Lokacija")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Lokacija");

                    b.Property<int?>("RezultatID")
                        .HasColumnType("int");

                    b.Property<string>("VremeOdrzavanja")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("VremeOdrzavanja");

                    b.HasKey("ID");

                    b.HasIndex("RezultatID");

                    b.ToTable("Mec");
                });

            modelBuilder.Entity("projekat.Models.Rezultat", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<int>("BrPoenaSeta1drugog")
                        .HasColumnType("int")
                        .HasColumnName("BrPoenaSeta1drugog");

                    b.Property<int>("BrPoenaSeta1prvog")
                        .HasColumnType("int")
                        .HasColumnName("BrPoenaSeta1prvog");

                    b.Property<int>("BrPoenaSeta2drugog")
                        .HasColumnType("int")
                        .HasColumnName("BrPoenaSeta2drugog");

                    b.Property<int>("BrPoenaSeta2prvog")
                        .HasColumnType("int")
                        .HasColumnName("BrPoenaSeta2prvog");

                    b.Property<int>("BrSet1")
                        .HasColumnType("int")
                        .HasColumnName("BrSet1");

                    b.Property<int>("BrSet2")
                        .HasColumnType("int")
                        .HasColumnName("BrSet2");

                    b.Property<int?>("Igrac1ID")
                        .HasColumnType("int");

                    b.Property<int?>("Igrac2ID")
                        .HasColumnType("int");

                    b.Property<bool>("KrajMeca")
                        .HasColumnType("bit")
                        .HasColumnName("KrajMeca");

                    b.Property<int>("TrenutniSet")
                        .HasColumnType("int")
                        .HasColumnName("TrenutniSet");

                    b.HasKey("ID");

                    b.HasIndex("Igrac1ID");

                    b.HasIndex("Igrac2ID");

                    b.ToTable("Rezultat");
                });

            modelBuilder.Entity("projekat.Models.Mec", b =>
                {
                    b.HasOne("projekat.Models.Rezultat", "Rezultat")
                        .WithMany()
                        .HasForeignKey("RezultatID");

                    b.Navigation("Rezultat");
                });

            modelBuilder.Entity("projekat.Models.Rezultat", b =>
                {
                    b.HasOne("projekat.Models.Igrac", "Igrac1")
                        .WithMany()
                        .HasForeignKey("Igrac1ID");

                    b.HasOne("projekat.Models.Igrac", "Igrac2")
                        .WithMany()
                        .HasForeignKey("Igrac2ID");

                    b.Navigation("Igrac1");

                    b.Navigation("Igrac2");
                });
#pragma warning restore 612, 618
        }
    }
}